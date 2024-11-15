require('dotenv').config(); 
const fs = require('fs');
const https = require('https');

const Api = process.env.API_KEY; // Pobierz klucz API z pliku .env


const readArticleFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Błąd podczas wczytywania pliku: ${err.message}`);
      }
      resolve(data);
    });
  });
};


const processArticleWithOpenAI = async (articleContent) => {
  const prompt = `
Przetwórz poniższy artykuł, dodając odpowiednie tagi HTML, aby strukturyzować treść.
Oznacz miejsca na obrazki z użyciem tagu <img> z atrybutem src="image_placeholder.jpg". 
Dołącz opis obrazka jako alt z promptem, który można wykorzystać do generowania grafiki,
a poniżej wstaw podpis w odpowiednim tagu HTML. Bez CSS i JavaScript. Tylko body.

Artykuł: ${articleContent}
`;

  const data = JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: prompt }],
    max_tokens: 1500,
    temperature: 0.5,
  });

  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Api}`,
      'Content-Length': Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          console.log('Odpowiedź API:', body);
          const parsedResponse = JSON.parse(body);
          if (parsedResponse.choices && parsedResponse.choices.length > 0) {
            resolve(parsedResponse.choices[0].message.content.trim());
          } else {
            reject('Odpowiedź API nie zawiera oczekiwanych danych.');
          }
        } catch (error) {
          reject(`Błąd podczas parsowania odpowiedzi API: ${error.message}`);
        }
      });
    });

    req.on('error', (e) => {
      reject(`Błąd podczas zapytania do API: ${e.message}`);
    });

    req.write(data);
    req.end();
  });
};


const saveToFile = (content, outputPath) => {
  fs.writeFile(outputPath, content, (err) => {
    if (err) {
      console.error(`Błąd podczas zapisywania pliku: ${err.message}`);
      throw err;
    }
    console.log(`Plik został zapisany do: ${outputPath}`);
  });
};


const generateTemplateHTML = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Szablon artykułu</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        article {
            max-width: 800px;
            margin: 0 auto;
        }
        h1, h2, h3 {
            color: #333;
        }
        img {
            display: block;
            margin: 20px auto;
            max-width: 100%;
        }
        figcaption {
            text-align: center;
            font-size: 0.9em;
            color: #555;
        }
    </style>
</head>
<body>
    <!-- Wklej artykuł tutaj -->
</body>
</html>
  `;
};


const main = async () => {
  try {
    const articlePath = './article.txt'; 
    const outputPathHTML = './artykul.html'; 
    const outputPathTemplate = './szablon.html'; 
    const outputPathPreview = './podglad.html'; 

    
    console.log('Wczytywanie pliku...');
    const articleContent = await readArticleFile(articlePath);
    console.log('Treść artykułu:', articleContent);

  
    console.log('Wysyłanie zapytania do API...');
    const htmlContent = await processArticleWithOpenAI(articleContent);

    if (htmlContent) {
      
      saveToFile(htmlContent, outputPathHTML);


      const templateContent = generateTemplateHTML();
      saveToFile(templateContent, outputPathTemplate);

   
      const fullPreviewContent = templateContent.replace(
        '<!-- Wklej artykuł tutaj -->',
        `<article>${htmlContent}</article>`
      );
      saveToFile(fullPreviewContent, outputPathPreview);
    } else {
      console.error('Nie otrzymano treści HTML z API');
    }
  } catch (error) {
    console.error("Wystąpił błąd:", error.message);
  }
};
main();

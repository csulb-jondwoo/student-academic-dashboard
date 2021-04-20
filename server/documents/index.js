module.exports = (termList) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Template</title>
          <style>
          </style>
       </head>
       <body>
          <div>
            ${`{Object.entries(termList).filter(([key, value]) => {
               return (
                  <h2>Term: {key}</h2> 
               )
            })}`}
          </div>
       </body>
    </html>
    `;
};

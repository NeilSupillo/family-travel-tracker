// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Hover Effect with Message</title>
//   <style>
//     /* Add some basic styling for the hover effect */
//     .hoverElement {
//       padding: 20px;
//       background-color: #3498db;
//       color: #fff;
//       cursor: pointer;
//       transition: background-color 0.3s ease;
//       margin-bottom: 10px;
//     }

//     /* Style for the message paragraph */
//     .messageParagraph {
//       color: #333;
//       font-weight: bold;
//       display: none;
//     }

//     /* Style for the container */
//     #messageContainer {
//       margin-top: 20px;
//     }
//   </style>
// </head>
// <body>

//   <!-- HTML elements with IDs for JavaScript to target -->
//   <div class="hoverElement" id="hoverElement1">Hover me!</div>

//   <div class="hoverElement" id="hoverElement2">Hover me too!</div>

//   <!-- Container to append paragraphs -->
//   <div id="messageContainer"></div>

//   <script>
//     // JavaScript code to add hover effect and display a message
//     for (let i = 1; i <= 2; i++) {
//       // Get the element using its ID
//       const hoverElement = document.getElementById(`hoverElement${i}`);

//       // Create a new paragraph element
//       const messageParagraph = document.createElement('p');
//       messageParagraph.className = 'messageParagraph';
//       messageParagraph.id = `messageParagraph${i}`;

//       // Append the paragraph to the container with ID "messageContainer"
//       const messageContainer = document.getElementById('messageContainer');
//       messageContainer.appendChild(messageParagraph);

//       // Add hover effect
//       hoverElement.addEventListener('mouseover', function() {
//         hoverElement.style.backgroundColor = '#2980b9';
//         messageParagraph.textContent = `You hovered over me${i === 1 ? '' : ' too'}!`;
//         messageParagraph.style.display = 'block';
//       });

//       hoverElement.addEventListener('mouseout', function() {
//         hoverElement.style.backgroundColor = '#3498db';
//         messageParagraph.style.display = 'none';
//       });
//     }
//   </script>

// </body>
// </html>

import React from 'react';

const templates = [
  { id: 1, name: 'ACP Dead', imageUrl: './templates/acp-dead.jpeg', keywords: ['acp', 'dead', 'cid'] },
  { id: 2, name: 'Alakh Pandey', imageUrl: './templates/alakh-pandey.png', keywords: ['alakh', 'pandey', 'teacher', 'pw'] },
  { id: 3, name: 'Angry PW', imageUrl: './templates/angry-pw.jpg', keywords: ['angry', 'pw', 'mad'] },
  { id: 4, name: 'Avijit See This', imageUrl: './templates/avijit-see-this.jpg', keywords: ['avijit', 'see', 'look'] },
  { id: 5, name: 'Avijit What??', imageUrl: './templates/avijit-what.jpg', keywords: ['avijit', 'what', 'confused'] },
  { id: 6, name: 'Bald Guy', imageUrl: './templates/bald-guy.jpg', keywords: ['bald', 'funny', 'guy'] },
  { id: 7, name: 'Black Tongue', imageUrl: './templates/black-tongue.jpg', keywords: ['black', 'tongue', 'weird'] },
  { id: 8, name: 'Daya Sad 2', imageUrl: './templates/daya-sad-2.jpg', keywords: ['daya', 'sad', 'crying'] },
  { id: 9, name: 'Daya Sad', imageUrl: './templates/dayasad.jpg', keywords: ['daya', 'sad', 'emotional'] },
  { id: 10, name: 'Depressed Gut', imageUrl: './templates/depress-gut.jpeg', keywords: ['depressed', 'gut', 'sad'] },
  { id: 11, name: 'Smile Freeky PW', imageUrl: './templates/smile-freeky.jpeg', keywords: ['smile', 'freaky', 'pw'] },
  { id: 12, name: 'Tongue PW', imageUrl: './templates/tongue-pw.jpg', keywords: ['tongue', 'pw', 'funny'] },
  { id: 13, name: 'Vivek', imageUrl: './templates/vivek.png', keywords: ['vivek', 'guy', 'student'] },
  { id: 14, name: 'What?', imageUrl: './templates/what.jpeg', keywords: ['what', 'confused', 'reaction'] },
  { id: 15, name: 'Yaaa Pantry', imageUrl: './templates/yaaa-pw.jpeg', keywords: ['yaa', 'pw', 'excited'] },
  { id: 16, name: 'Yooo', imageUrl: './templates/yo.jpg', keywords: ['yo', 'pw', 'swag'] },
];


function TemplateList({ onTemplateSelect, searchTerm = '', gridClass = '', nameBelowImage = true }) {
  const filteredTemplates = templates.filter((template) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      template.name.toLowerCase().includes(searchLower) ||
      template.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className={gridClass}>
      {filteredTemplates.map((template) => (
        <div
          key={template.id}
          className="flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-105"
          onClick={() => onTemplateSelect(template)}
        >
          {/* Image Container with fixed aspect ratio */}
          <div className="w-full max-w-sm aspect-w-1 aspect-h-1 relative rounded-xl overflow-hidden shadow-md">
            <img
              src={template.imageUrl}
              alt={template.name}
              className="object-cover h-80 w-80"
            />
          </div>

          {nameBelowImage && (
            <p className="mt-3 text-center text-lg Galter">
              {template.name}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default TemplateList;

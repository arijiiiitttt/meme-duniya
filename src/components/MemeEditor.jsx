"use client"
import React, { useState, useRef } from 'react';
import domtoimage from 'dom-to-image';

function MemeEditor({ template, onBack }) {
  const [texts, setTexts] = useState([]);
  const [inputText, setInputText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(24);
  const memeRef = useRef(null);

  const handleAddText = () => {
    if (inputText.trim() === '') return;
    setTexts([
      ...texts,
      {
        id: Date.now(),
        text: inputText,
        x: 100,
        y: 100,
        color: textColor,
        fontSize: fontSize,
      },
    ]);
    setInputText('');
  };

  const handleDownload = async () => {
    if (!memeRef.current) return;
    try {
      const dataUrl = await domtoimage.toPng(memeRef.current, { bgcolor: 'transparent' }); // Add bgcolor option
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'meme.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading meme:', error);
      alert('Failed to download meme. See console for details.');
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      <button
        onClick={onBack}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-full mb-6 shadow transition-all"
      >
         Back to Templates
      </button>

      {/* Meme Container */}
      <div
        ref={memeRef}
        className="relative w-full max-w-3xl h-[500px]  rounded-lg overflow-hidden"
      >
        <img
          src={template.imageUrl}
          alt={template.name}
          className="w-full h-full object-contain" 
        />

        {texts.map((t) => (
          <div
            key={t.id}
            style={{
              position: 'absolute',
              top: t.y,
              left: t.x,
              color: t.color,
              fontWeight: 'bold',
              fontSize: `${t.fontSize}px`,
              cursor: 'move',
              userSelect: 'none',
              whiteSpace: 'pre',
            }}
            onMouseDown={(e) => {
              const containerRect = memeRef.current.getBoundingClientRect();
              const startX = e.clientX;
              const startY = e.clientY;
              const offsetX = startX - containerRect.left - t.x;
              const offsetY = startY - containerRect.top - t.y;

              const onMouseMove = (moveEvent) => {
                const newX = moveEvent.clientX - containerRect.left - offsetX;
                const newY = moveEvent.clientY - containerRect.top - offsetY;

                setTexts((prev) =>
                  prev.map((item) =>
                    item.id === t.id ? { ...item, x: newX, y: newY } : item
                  )
                );
              };

              const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
              };

              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
          >
            {t.text}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-8 w-full max-w-2xl flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Enter text or emoji 😎"
            className="flex-grow px-4 py-2 rounded border shadow"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="h-10 w-10 rounded-full content-fit border shadow"
            title="Pick text color"
          />
          <input
            type="range"
            min={12}
            max={64}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-24"
            title="Font Size"
          />
          <span className="text-sm text-gray-700">{fontSize}px</span>
          <button
            onClick={handleAddText}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-3 rounded-full mb-6 shadow transition-all"
          >
            Add
          </button>
        </div>

        <button
          onClick={handleDownload}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold self-center py-2 px-3 rounded-full mb-6 shadow transition-all"
        >
          Download Meme
        </button>
      </div>
    </div>
  );
}

export default MemeEditor;

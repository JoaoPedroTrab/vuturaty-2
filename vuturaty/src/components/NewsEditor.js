import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const NewsEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'color': []}, {'background': []}],
      [{'align': []}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image'
  ];

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleContentChange = (value) => setContent(value);

  const handleSubmit = () => {
    console.log({ title, content });
    // Adicione aqui a lógica para enviar o conteúdo para o servidor
  };

  const handlePreview = () => {
    // Aqui usamos o estado para passar os dados para a página de pré-visualização
    navigate('/post/preview', { state: { title, content } });
  };

  return (
    <div className="bg-neutral-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="mb-8">
        <InputText
          value={title}
          onChange={handleTitleChange}
          placeholder="Digite o título da sua notícia..."
          className="w-full text-3xl font-oswald text-primary-blue-main border-none outline-none placeholder-neutral-gray-400"
        />
      </div>

      <ReactQuill 
        theme="snow"
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        className="bg-white mb-8"
        placeholder="Comece a escrever sua notícia aqui..."
      />

      <div className="flex justify-end space-x-4">
        <Button 
          label="Pré-visualizar"
          icon="pi pi-eye"
          className="px-6 py-3 bg-primary-yellow-main hover:bg-primary-yellow-light text-neutral-white font-oswald text-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-yellow-light focus:ring-opacity-50"
          onClick={handlePreview}
        />
        <Button 
          label="Publicar"
          icon="pi pi-send"
          className="px-6 py-3 bg-primary-blue-main hover:bg-primary-blue-dark text-neutral-white font-oswald text-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-blue-light focus:ring-opacity-50"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default NewsEditor;
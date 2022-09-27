import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Dictionary } from './components/Dictionary/Dictionary';
import { AddAWord } from './components/AddAWord/AddAWord';
import { WordsTest } from './components/WordsTest/WordsTest';
import { Result } from './components/Result/Result';

export const App: React.FC = () => {
  return (
    <>
      <NavBar />

      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Dictionary />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="addAWord" element={<AddAWord />} />
            <Route path="test" element={<WordsTest />} />
            <Route path="result" element={<Result />} />

            <Route path="*" element={<h1>Error :(</h1>} />
          </Routes>
        </div>
      </main>
    </>
  );
};

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import searchData from '../data/searchIndex.json';
import Header from '../components/organisms/Header2'
import Footer from '../components/organisms/Footer'
import SearchBar from '../components/organisms/Search';

/** Buscar
    * By making use of Javascript's filter and a collection of the available pages in searchIndex.json
    * The query will be compared with the contents of the description and tags in order to find a fitting result
    */
const Buscar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  /** filteredResults
    * The function in charge of computing  the results after filtering, creates a new list with only the matching results
    */
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    /** lowerQuery
    * Makes sure the search can be filtered easily by normalizing to only lowercase
    */
    const lowerQuery = query.toLowerCase();
    return searchData.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    });
  }, [query]);

  return (
    <div>
      <Header />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-9/10 mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-negro-txt mb-2">
              Sección de Busquedas
            </h1>
          </div>
          
          {/* Search Bar Container */}
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={Buscar} 
          />


          {/* Results Section */}
          <div className="space-y-4">
            {query.trim() === '' ? (
              <div className="text-center py-20 text-negro-txt">
                <svg
                  className="mx-auto h-12 w-12 text-negro-txt"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="mt-4 text-lg">Empieza a buscar</p>
              </div>
            ) : filteredResults.length > 0 ? (
              filteredResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => navigate(result.path)}
                  className="group p-6 rounded-sm border border-gray-200 shadow-sm hover:shadow-md hover:border-azul-url cursor-pointer transition-all duration-200"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-negro-txt group-hover:text-azul-url transition-colors">
                      {result.title}
                    </h2>
                    <span className="text-xs font-medium text-azul-url bg-blue-50 px-2 py-1 rounded-full">
                      Ver página
                    </span>
                  </div>
                  <p className="mt-2 text-griso-prf text-sm leading-relaxed">
                    {result.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.625rem] uppercase tracking-wider font-bold text-griso-prf bg-gris-bg2 px-2 py-0.5 rounded"
                    >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              
                <div className="text-center py-20 rounded-sm border border-dashed border-reg_bg2">
                  <p className="text-negro-txt text-lg">
                    No encontramos resultados para "<strong>{query}</strong>"
                  </p>
                  <p className="text-negro-txt text-sm mt-2">
                    Prueba con otras palabras clave o revisa la ortografía.
                  </p>
                </div>
            )}
          </div>
        </div>
        
      </main>
      <Footer />
    </div>
  );
};

export default Buscar;

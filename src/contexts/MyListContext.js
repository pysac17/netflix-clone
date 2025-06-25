import { createContext, useContext, useState, useEffect } from 'react';

const MyListContext = createContext();

export const MyListProvider = ({ children }) => {
    const [myList, setMyList] = useState(() => {
        const saved = localStorage.getItem('netflixMyList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('netflixMyList', JSON.stringify(myList));
    }, [myList]);

    const addToMyList = (movie) => {
        setMyList(prev => {
            const exists = prev.some(m => m.imdbID === movie.imdbID);
            return exists ? prev : [...prev, movie];
        });
    };

    const removeFromMyList = (imdbID) => {
        setMyList(prev => prev.filter(movie => movie.imdbID !== imdbID));
    };

    const isInMyList = (imdbID) => {
        return myList.some(movie => movie.imdbID === imdbID);
    };

    return (
        <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInMyList }}>
            {children}
        </MyListContext.Provider>
    );
};

export const useMyList = () => {
    const context = useContext(MyListContext);
    if (!context) {
        throw new Error('useMyList must be used within a MyListProvider');
    }
    return context;
};

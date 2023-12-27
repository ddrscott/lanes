import { useState, useEffect } from "react";


function Lane({ id, url, onUrlChange, onClose }) {
    const [inputValue, setInputValue] = useState(url || '');
    const [iframeUrl, setIframeUrl] = useState(url || '');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Input Value on Enter:', inputValue); // Add this line for debugging
            setIframeUrl(inputValue);
            onUrlChange(id, inputValue);
        }
    };

    const onRefresh = () => {
        setIframeUrl(''); // Temporarily set to an empty string to force reload
        setTimeout(() => setIframeUrl(inputValue), 0); // Then immediately set back to the original URL
    };

    return (
        <div className="column">
            <div className="join">
                <button className="btn join-item btn-sm" onClick={onRefresh}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 30 30"><path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path></svg></button>
                <input
                    className="input input-sm input-bordered join-item"
                    type="text"
                    placeholder="Open URL (then press Enter)"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    style={{width: "calc(100% - 2em)"}}
                />
                <button className="btn join-item btn-sm" onClick={() => onClose(id)}>Close</button>
            </div>
            <iframe
                src={iframeUrl}
                frameBorder="1"
            />
        </div>
    );
}

export default function Lanes() {
    const [columns, setColumns] = useState([]);

    // Effect hook to load URLs from localStorage on mount
    useEffect(() => {
        const savedUrls = JSON.parse(localStorage.getItem('urls'));
        if (savedUrls) {
            const columnsWithIds = savedUrls.map((url, index) => ({
                id: index + 1,
                url: url
            }));
            setColumns(columnsWithIds);
        }
    }, []);

    // useEffect hook
    useEffect(() => {
        saveUrlsToLocalStorage(); // This function will be called automatically when 'columns' changes
    }, [columns]);

    // Function to save URLs to localStorage
    const saveUrlsToLocalStorage = () => {
        const urls = columns.map(column => column.url);
        console.log('Saving URLs to localStorage:', urls); // Add this line for debugging
        localStorage.setItem('urls', JSON.stringify(urls));
    };

    // Function to add a new column
    const addColumn = (url = '') => {
        const newColumn = {
            id: columns.length + 1,
            url: url
        };
        setColumns(prevColumns => [...prevColumns, newColumn]);
    };

    // Function to update a column's URL
    const handleUrlChange = (id, newUrl) => {
        setColumns(prevColumns => prevColumns.map(column =>
            column.id === id ? { ...column, url: newUrl } : column
        ));
    };

    // Function to remove a column
    const removeColumn = (id) => {
        setColumns(prevColumns => prevColumns.filter(column => column.id !== id));
    };

    return (
        <div>
            <button className="btn btn-outline" id="add-column-btn" onClick={() => addColumn()}>Add</button>
            <div className="column-container">
                {columns.map(column => (
                    <Lane key={column.id} id={column.id} url={column.url} onUrlChange={handleUrlChange} onClose={removeColumn} />
                ))}
            </div>
        </div>
    );
}

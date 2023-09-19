import React, { useState, useEffect } from 'react';
import '../common/styles/articleForm.css'

function ArticleForm() {
  const [articleData, setArticleData] = useState({
    ArticleHeading: '',
    ArticleSubHeading: '',
    ArticleBody: '',
    selectedOption: '', // For the dropdown
  });

  const [options, setOptions] = useState([]); // To store dropdown options

  useEffect(() => {
    // Fetch data for the dropdown from an API endpoint
     fetch("http://localhost:3000/GetNavCategories")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data)
      } )
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData({
      ...articleData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setArticleData({
      ...articleData,
      selectedOption: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data for POST request
    const postData = {
      ArticleHeading: articleData.ArticleHeading,
      ArticleSubHeading: articleData.ArticleSubHeading,
      ArticleBody: articleData.ArticleBody,
      SelectedOption: articleData.selectedOption,
    };

    // POST data to your API endpoint
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          // You can perform any other actions here, such as resetting the form.
        } else {
          console.error('Error submitting data.');
        }
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="article-form-container">
      <h2>Create Article</h2>
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="ArticleHeading">Article Heading:</label>
          <input
            type="text"
            id="ArticleHeading"
            name="ArticleHeading"
            value={articleData.ArticleHeading}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ArticleSubHeading">Article Subheading:</label>
          <input
            type="text"
            id="ArticleSubHeading"
            name="ArticleSubHeading"
            value={articleData.ArticleSubHeading}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ArticleBody">Article Body:</label>
          <textarea
            id="ArticleBody"
            name="ArticleBody"
            value={articleData.ArticleBody}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="selectedOption">Dropdown:</label>
          <select
            id="selectedOption"
            name="selectedOption"
            value={articleData.selectedOption}
            onChange={handleSelectChange}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option._id} value={option.navCategoryName}>
                {option.navCategoryName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default ArticleForm;

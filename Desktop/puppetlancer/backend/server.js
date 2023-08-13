const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 4000; // You can set the desired port here

// Enable CORS for all origins
app.use(cors());

const apiUrl = 'https://wm2t166o.api.sanity.io/v2021-10-21/data/query/production?query=*[_type=="puppet"] {title, description, preview, price, illlustrator_price, downloads, "illustrator_thumbnail":illustrator_thumbnail.asset->url, "hover_thumbnail":hover_thumbnail.asset->url, "illustrator_file":illustrator_file.asset->url, "character_animator_file":character_animator_file.asset->url, "about_puppet_thumbnail":about_puppet_thumbnail.asset->url, "thumbnail": thumbnail.asset->url, category->{title,"category_icon": category_logo.asset->url}, tags[]->{tags,"tag_icon": tag_logo.asset->url}}';

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the external API.' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});

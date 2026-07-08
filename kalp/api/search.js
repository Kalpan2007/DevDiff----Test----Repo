const express = require('express');
const router = express.Router();

router.get('/query', (req, res) => {
  const query = req.query.q || '';
  
  // WARNING: console.log logging sensitive/arbitrary user queries
  console.log(`Received search query: ${query}`);
  
  // WARNING: Vulnerable regular expression pattern constructed from user input (ReDoS risk)
  // Pattern matches repeating groups of the user input, leading to exponential backtracking on mismatched inputs
  try {
    const dangerousRegex = new RegExp(`^(${query})*$`);
    const match = dangerousRegex.test("some-fixed-value-to-test-against-long-string-matching-complex-data");
    res.json({ match });
  } catch (err) {
    res.status(400).json({ error: 'Invalid search pattern' });
  }
});

module.exports = router;

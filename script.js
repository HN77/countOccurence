function countOccurence(text, occurrence) {
  var element = document.getElementById('text');
  var bodyContent = element ? element.innerHTML : '';

  // Remove script tags and their content
  bodyContent = bodyContent.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ''
  );

  // Remove HTML tags and normalize spaces
  var cleanText = bodyContent.replace(/<[^>]+>/g, ' ');

  // Handle specific cases for 'o'clock' and similar phrases
  cleanText = cleanText.replace(/(\w)'(\w)/g, '$1$2'); // Corrects 'o'clock' to 'oclock'
  cleanText = cleanText.replace(/\s+/g, ' ').trim().toLowerCase();

  // Escape special characters in search text for exact matching
  var escapedText = text
    .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    .toLowerCase();

  // Create RegExp for exact word boundary matching
  var regex = new RegExp('\\b' + escapedText + '\\b', 'gi');

  // Find all matches in the cleaned text
  var occurrences = cleanText.match(regex);

  if (!occurrences) {
    return 0;
  }

  // Count exact matches if specified
  if (occurrence === 'exact') {
    var exactMatches = occurrences.filter(function (word) {
      return word.toLowerCase() === escapedText;
    });
    return exactMatches.length;
  } else {
    return occurrences.length;
  }
}

self.onmessage = function(e) {
  const { word, content } = e.data;
  const ranges = [];
  const lines = content.split('\n');
  const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
  lines.forEach((line, index) => {
    let match;
    while ((match = regex.exec(line)) !== null) {
      ranges.push({
        startLineNumber: index + 1,
        startColumn: match.index + 1,
        endLineNumber: index + 1,
        endColumn: match.index + match[0].length + 1
      });
    }
  });
  self.postMessage({ ranges });
};
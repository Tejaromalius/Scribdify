async function scribdify() {
  try {
    const tabs = await browser.tabs.query({ active: true });
    if (!tabs || tabs.length === 0 || !tabs[0].url) {
      console.error('Unable to get active tab or its URL');
      return;
    }
    
    const url = tabs[0].url;
    if (!url.includes('scribd.com/document/')) {
      console.log('The active tab does not contain a Scribd document');
      return;
    }
    
    const urlParts = url.split('/');
    if (urlParts.length < 5) {
      console.error('Unable to extract document ID from the URL');
      return;
    }
    
    const embedUrl = `https://www.scribd.com/embeds/${urlParts[4]}/content?`
    + `start_page=1&view_mode=scroll&access_key=key-fFexxf7r1bzEfWu3HKwf`;
    await browser.tabs.create({ url: embedUrl });
  } catch (error) {
    console.error('An error occurred while redirecting:', error);
  }
}

browser.browserAction.onClicked.addListener(scribdify);
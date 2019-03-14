var elements = document.getElementsByTagName('*');

const period = chrome.storage.sync.get(
    ['period','amount'], 
    function(result) {

       

        var period = result.period;
        var amount = result.amount;
        var priceHour = 0;
        if( period == "hour" )
        {
            priceHour = amount * 8;
        }
        if( period == "fortnight" )
        {
            priceHour = amount / 15;
        }
        if( period == "month" )
        {
            priceHour = amount / 30 ;
        }
        
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];
                if (node.nodeType == 3) {
                    var text = node.nodeValue;
                    if( text.includes("$"))
                    {       
                        var patt = /[$]\d+(?:,\d{3})*(?:\.\d+)?\b/g;
                        var result = patt.test(text);
                        if(result)
                        {
                            function priceToDays(match)
                            {
                                var temp = match.toString().replace("$", "").replace(",","");
                                return text.replace(match, "$" + ((temp/priceHour).toFixed(2)) + " Días");
                            }
                            
                            replacedText = text.replace(patt, priceToDays);
                            element.replaceChild(document.createTextNode(replacedText ), node);

/*
                            var originalValue = text.match(patt);
                            var temp = originalValue.toString().replace("$", "").replace(",","");
                            var timeCost = (temp/priceHour).toFixed(2);
                            replacedText = text.replace(originalValue,"$" + timeCost + " Días");
                            element.replaceChild(document.createTextNode(replacedText ), node);
                            node.sync;
                            */
                        }
                    }
                }
            }
            
        }
    });

import { Context } from "hono";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";


export async function titleGenerator(c:Context,userInput:string){
    const model = new ChatGroq({
        apiKey: c.env.GROQ_API_KEY,
        model: "gemma-7b-it"
      });
    
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a world class blog title generator and you only generate title based on the input provided by the user"],
        ["user", "{input}"],
    ]);

    const chain = prompt.pipe(model);
    const title = await chain.invoke({
        input: `Generate 10 title for the blog ${userInput}`,
      });
    // console.log(title.content)
    const finalTitle = retrieveTitles(title.content as string)

    return finalTitle;
}

function retrieveTitles(input:string) {
    const regex = /(?<=^\d+\.\s|\*|\").([^\n]*)/gm;
    const titles:string[] = [];
    let match;
    while ((match = regex.exec(input)) !== null) {
      titles.push(match[0]);
    }
    return titles[0];
}

export async function ImageLink(c:Context,userInput:string){
    const words = userInput.split(" ")
    const input  = words[words.length-1]
    const response = await fetch(`https://api.search.brave.com/res/v1/images/search?q=${encodeURIComponent(input)}&spellcheck=1`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip",
            "X-Subscription-Token": c.env.BRAVE_API_KEY as string
        }
    });
    if(!response.ok){
        console.log(`Error fetching the images. Status: ${response.status}`)
        return [{title:'',link:''}];
        // throw new Error(`Error fetching the images. Status: ${response.status}`)
    }

    const data:any = await response.json()
        // there were some instances where the links were broken and not a good experience for the user 
        // optional step can totally skip it 
        // console.log(data)
        const validLinks = await Promise.all(
            data.results.map(async (result: any)=> {
                const link = result.properties.url;
                if(typeof link === 'string'){
                    try {
                        const imageResponse = await fetch(link, {method: 'HEAD'});
                        if(imageResponse.ok){
                            const contentType = imageResponse.headers.get('content-type');
                            if(contentType && contentType.startsWith('image/')){
                                return {
                                    title: result.properties.title,
                                    link: link
                                }
                            }
                        }
                    } catch (error) {
                        console.error(`Error fetching the image link ${link}:`, error)
                    }
                }
                return null
            })
        );
        // to filter out the links that are null and do not assert to the type specified just a guard function to make sure everything is fine
        const filteredLinks = validLinks.filter((link): link is {title: string, link: string} => link!==null)
        const rand = Number(Math.random().toFixed(1))*10;

        // returning 10 images as we are fetching 10 pages just to be similar can increase and decrease according to your choice 
        return filteredLinks[rand]
}
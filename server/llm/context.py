import os
from embedchain import App
from dotenv import load_dotenv
load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

app = App.from_config(config_path=r"C:\Users\soham\Desktop\CS\Personal Projects\oreto\server\llm\config.yaml")

# app.add("https://www.forbes.com/profile/elon-musk")
# response = app.query("What is the net worth of Elon Musk?")

# if app.llm.config.stream:  # if stream is enabled, response is a generator
#     for chunk in response:
#         print(chunk)
# else:
#     print(response)
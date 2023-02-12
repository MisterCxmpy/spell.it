import openai
import sys
from dotenv import load_dotenv
import os

def configure():
    load_dotenv()

configure()

user_text = sys.argv[1]

openai.api_key = os.getenv("api_key")

model_engine = "text-davinci-003"
prompt = "Grammatically correct this sentence: "

completion = openai.Completion.create(
    engine=model_engine,
    prompt=prompt + user_text,
    max_tokens=1024,
    n=1,
    stop=None,
    temperature=0.5,
)

response = completion.choices[0].text

sys.stdout.flush()

print(response)
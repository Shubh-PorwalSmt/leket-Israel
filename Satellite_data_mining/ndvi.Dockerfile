FROM python:3.8

WORKDIR /app

COPY . .

RUN pip install -r Satellite_data_mining/requirements.txt

CMD ["python3","Satellite_data_mining/satellite_data_mining.py"]

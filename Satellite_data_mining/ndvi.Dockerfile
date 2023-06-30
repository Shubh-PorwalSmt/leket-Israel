FROM python:3.8

WORKDIR /app

COPY . .
RUN ls -l
RUN pip install -r Satellite_data_mining/requirements.txt

CMD ["python3","satellite_data_mining.py"]

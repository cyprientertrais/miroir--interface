FROM mongo as m
RUN mkdir -p /data/db /var/dump/
COPY basic-dataset.zip .
RUN apt-get update -y --no-install-recommends && apt-get install unzip -y --no-install-recommends && unzip basic-dataset.zip -d /var/dump/ && rm -rf /var/lib/apt/lists/*
CMD ["mongod"]
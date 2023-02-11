#!/bin/bash
scp -r -i ~/.ssh/cds_geth.pem ~/Study/BEB_07/projects/CDS/server/dist/ ubuntu@ec2-3-37-87-219.ap-northeast-2.compute.amazonaws.com:~/cds/server/
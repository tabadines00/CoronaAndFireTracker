from flask import Response, url_for, current_app, request
from flask_restful import Resource, reqparse
import pandas as pd
import os
from pathlib import Path
from flask_mysqldb import MySQL
from datetime import datetime
import random
import string

db = MySQL()
parser = reqparse.RequestParser()

class DirectorLogin(Resource):
    def get(self):
        username = request.args.get('username')
        password = request.args.get('password')
        cur = db.connection.cursor()
        cur.execute(
            """
            Select * from directors where Mail = %s and pwd = %s;
            """, (username, password)
        )
        data = cur.fetchall()
        if (cur.rowcount == 0):
            cur = db.connection.cursor()
            cur.execute(
                """
                Select * from directors where Mail = %s and pwd = %s;
                """, (username, password)
            )
            data = cur.fetchall()
            if (cur.rowcount == 0):
                return Response("No account found!!")
        row_headers=[x[0] for x in cur.description]
        json_data=[]
        for result in data:
            json_data.append(dict(zip(row_headers,result)))
        cur.close()
        df = pd.DataFrame(json_data)
        return Response(df.to_json(orient="records"), mimetype='application/json')
    
class UpdateHealth(Resource):
    def post(self):
        params = ['confirmed', 'death', 'recovered', 'countie']
        for elem in params:
            parser.add_argument(elem)
        args = parser.parse_args()
        Confirmed, Death, Recovered, Countie = [x for x in args.values()]
        now = datetime.now()
        dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
        randomID = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(32)])
        cur = db.connection.cursor()
        cur.execute(
            """
                INSERT INTO Covid_update (Update_id, Confirmed, Recovered, death, dates, countie)
                VALUES (%s, %s, %s, %s, %s, %s);
            """, (randomID, Confirmed, Recovered, Death, dt_string, Countie)
        )
        db.connection.commit()
        if cur.rowcount > 0:
            return Response("Record Sucessfully inserted", status=200)
        else:
            return Response("Insertion failed", status=500)
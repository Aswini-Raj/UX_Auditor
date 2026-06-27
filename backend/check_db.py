import psycopg2

try:
    conn = psycopg2.connect(
        host='127.0.0.1',
        port=5432,
        user='postgres',
        password='',
        dbname='postgres'
    )
    print("Connected to PostgreSQL OK")
    cur = conn.cursor()
    cur.execute("SELECT datname FROM pg_database WHERE datname='ux_auditor'")
    r = cur.fetchone()
    print("ux_auditor DB exists:", r is not None)
    conn.close()
except Exception as e:
    print(f"Connection error: {e}")

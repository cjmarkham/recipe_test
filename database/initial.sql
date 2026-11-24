CREATE TABLE recipes (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     ingredients TEXT[] NOT NULL,
     calories INTEGER NOT NULL,
     protein NUMERIC NOT NULL
);
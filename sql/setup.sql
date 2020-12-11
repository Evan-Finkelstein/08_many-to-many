DROP TABLE IF EXISTS cocktails CASCADE;
DROP TABLE IF EXISTS liquors CASCADE ;
DROP TABLE IF EXISTS cocktails_liquors;


CREATE TABLE cocktails (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL

);

CREATE TABLE liquors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 type TEXT NOT NULL
);

CREATE TABLE cocktails_liquors (
  cocktails_id BIGINT REFERENCES cocktails(id),
  liquors_id BIGINT REFERENCES liquors(id),
  PRIMARY KEY(cocktails_id, liquors_id)
);
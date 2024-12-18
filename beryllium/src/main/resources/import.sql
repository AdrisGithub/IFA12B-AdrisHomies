INSERT INTO ARTICLES (NAME, DESCRIPTION, ADDITIONAL_VALUES, SELL_PRICE, BUY_PRICE) VALUES ('Ball','Grüner Ball','{}', 3.99, 4.9);
INSERT INTO ARTICLES (NAME, DESCRIPTION, ADDITIONAL_VALUES, SELL_PRICE, BUY_PRICE) VALUES ('Stirnband','Rotes Stirnband','{}', 30.99, 40.99);
INSERT INTO ARTICLES (NAME, DESCRIPTION, ADDITIONAL_VALUES, SELL_PRICE, BUY_PRICE) VALUES ('Flasche','Flasche mit Deckel der nur einmal abgeht','{"Farbe":"Grün","Höhe":"2 Meter 50"}', 30.99, 49.99);
INSERT INTO ARTICLES (NAME, DESCRIPTION, ADDITIONAL_VALUES, SELL_PRICE, BUY_PRICE) VALUES ('Laptop','Laptop mit KI in der Hardware','{"TEST":"TEST","Moin":"Nicht Moin"}', 322.99, 43.99);
INSERT INTO ARTICLES (NAME, DESCRIPTION, ADDITIONAL_VALUES, SELL_PRICE, BUY_PRICE) VALUES ('Tisch','Tisch mit runden Kanten','{}', 387.99, 44.99);
INSERT INTO ARTICLES (NAME, DESCRIPTION, ADDITIONAL_VALUES, SELL_PRICE, BUY_PRICE) VALUES ('Badehaube','Badehaube aus Gummi','{}', 387.99, 44.99);


INSERT INTO SERVICES (DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES ('Massage ohne Happy End', 'Massage', true,1.99, '{}' );
INSERT INTO SERVICES (DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES ('default: Süß-Sauer', 'Massage mit Sauce', true,1.99, '{"Andere Saucen":"BBQ, Sweet-Onion, Honey-Mustard"}' );
INSERT INTO SERVICES (DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES ('Tisch putzen', 'Putzen', true,7.99, '{}' );
INSERT INTO SERVICES (DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES ('Boden putzen', 'Putzen', false,100.99, '{}' );
INSERT INTO SERVICES (DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES ('TÜV Prüfung', 'TÜV', true,19.99, '{}' );
INSERT INTO SERVICES (DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES ('Stühle schleppen hin und her', 'Stühle schleppen', false,2.00, '{}' );

INSERT INTO DEPOSITORY_SPOTS (ROW_NR, COLUMN_NR) VALUES (1, 2);
INSERT INTO DEPOSITORY_SPOTS (ROW_NR, COLUMN_NR) VALUES (2, 2);
INSERT INTO DEPOSITORY_SPOTS (ROW_NR, COLUMN_NR) VALUES (1, 1);
INSERT INTO DEPOSITORY_SPOTS (ROW_NR, COLUMN_NR) VALUES (10, 10);
INSERT INTO DEPOSITORY_SPOTS (ROW_NR, COLUMN_NR) VALUES (23, 1);

INSERT INTO ARTICLE_ITEMS (ARTICLE_ID, SPOT_ID, AMOUNT) VALUES (1, 1, 100);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ID, SPOT_ID, AMOUNT) VALUES (1, null, 100);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ID, SPOT_ID, AMOUNT) VALUES (2, 2, 1000);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ID, SPOT_ID, AMOUNT) VALUES (3, 3, 10);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ID, SPOT_ID, AMOUNT) VALUES (4, 4, 4200);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ID, SPOT_ID, AMOUNT) VALUES (5, 5, 69);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ID, SPOT_ID, AMOUNT) VALUES (6, null, 69);
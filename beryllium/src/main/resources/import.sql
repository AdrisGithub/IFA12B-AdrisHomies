INSERT INTO ARTICLES (ID, NAME, DESCRIPTION, ADDITIONAL_VALUES) VALUES (1,'Ball','Grüner Ball','{}');
INSERT INTO ARTICLES (ID, NAME, DESCRIPTION, ADDITIONAL_VALUES) VALUES (2,'Stirnband','Rotes Stirnband','{}');
INSERT INTO ARTICLES (ID, NAME, DESCRIPTION, ADDITIONAL_VALUES) VALUES (3,'Flasche','Flasche mit Deckel der nur einmal abgeht','{}');
INSERT INTO ARTICLES (ID, NAME, DESCRIPTION, ADDITIONAL_VALUES) VALUES (4,'Laptop','Laptop mit KI in der Hardware','{}');
INSERT INTO ARTICLES (ID, NAME, DESCRIPTION, ADDITIONAL_VALUES) VALUES (5,'Tisch','Tisch mit runden Kanten','{}');

INSERT INTO SERVICES (ID, DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES (10,'Massage ohne Happy End', 'Massage', true,1.99, '{}' );
INSERT INTO SERVICES (ID, DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES (11,'Tisch putzen', 'Putzen', true,7.99, '{}' );
INSERT INTO SERVICES (ID, DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES (12,'Boden putzen', 'Putzen', false,100.99, '{}' );
INSERT INTO SERVICES (ID, DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES (13,'TÜV Prüfung', 'TÜV', true,19.99, '{}' );
INSERT INTO SERVICES (ID, DESCRIPTION, NAME, AVAILABLE, PRICE, ADDITIONAL_VALUES) VALUES (14,'Stühle schleppen hin und her', 'Stühle schleppen', false,2.00, '{}' );

INSERT INTO DEPOSITORY_SPOTS (SPOT_ID, ROW_NR, COLUMN_NR) VALUES (20, 1, 2);
INSERT INTO DEPOSITORY_SPOTS (SPOT_ID, ROW_NR, COLUMN_NR) VALUES (21, 2, 2);
INSERT INTO DEPOSITORY_SPOTS (SPOT_ID, ROW_NR, COLUMN_NR) VALUES (22, 1, 1);
INSERT INTO DEPOSITORY_SPOTS (SPOT_ID, ROW_NR, COLUMN_NR) VALUES (23, 10, 10);
INSERT INTO DEPOSITORY_SPOTS (SPOT_ID, ROW_NR, COLUMN_NR) VALUES (24, 23, 1);

INSERT INTO ARTICLE_ITEMS (ARTICLE_ITEM_ID, ARTICLE_ID, SPOT_ID, SELL_PRICE, BUY_PRICE, AMOUNT) VALUES (30, 1, 20, 3.99, 4.99, 100);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ITEM_ID, ARTICLE_ID, SPOT_ID, SELL_PRICE, BUY_PRICE, AMOUNT) VALUES (31, 1, null, 30.99, 40.99, 100);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ITEM_ID, ARTICLE_ID, SPOT_ID, SELL_PRICE, BUY_PRICE, AMOUNT) VALUES (32, 2, 21, 30.99, 49.99, 1000);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ITEM_ID, ARTICLE_ID, SPOT_ID, SELL_PRICE, BUY_PRICE, AMOUNT) VALUES (33, 3, 22, 322.99, 43.99, 10);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ITEM_ID, ARTICLE_ID, SPOT_ID, SELL_PRICE, BUY_PRICE, AMOUNT) VALUES (34, 4, 23, 387.99, 44.99, 4200);
INSERT INTO ARTICLE_ITEMS (ARTICLE_ITEM_ID, ARTICLE_ID, SPOT_ID, SELL_PRICE, BUY_PRICE, AMOUNT) VALUES (35, 5, 24, 787.99, 40.99, 69);
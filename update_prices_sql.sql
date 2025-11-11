-- SQL commands to update alcohol prices to local rates in Hinjewadi Pune
-- Copy and paste these commands into the Supabase SQL editor

UPDATE menu_items SET price = 450 WHERE id = '93214b03-150e-4742-8b78-b1fdb9d08aba'; -- BUDWEISER PREMIUM: ₹8 → ₹450
UPDATE menu_items SET price = 450 WHERE id = 'b317ffc3-0ed3-4a49-9f51-7c475b971464'; -- BUDWEISER MAGNUM: ₹9 → ₹450
UPDATE menu_items SET price = 400 WHERE id = 'eba81aed-76b2-43f6-8cf7-95857670daa6'; -- KINGFISHER PREMIUN: ₹6 → ₹400
UPDATE menu_items SET price = 400 WHERE id = 'ad3e6d43-cf77-4124-be08-290a19263dcf'; -- KINGFISHER ULTRA: ₹7 → ₹400
UPDATE menu_items SET price = 500 WHERE id = '0cbd1c84-00b6-4c69-816f-4f0fae845de7'; -- CORONA: ₹8.5 → ₹500
UPDATE menu_items SET price = 550 WHERE id = 'aa45296b-b509-47c6-928e-ef1b1cc756c9'; -- HOEGARDEN: ₹9 → ₹550
UPDATE menu_items SET price = 850 WHERE id = '8aeaa974-a8dd-4798-949b-4abee86c73f1'; -- BALLANTINES FINEST: ₹8.5 → ₹850
UPDATE menu_items SET price = 900 WHERE id = 'ecc72bf0-7ee2-413d-b80b-ced4e5c67415'; -- BLACK & WHITE: ₹9 → ₹900
UPDATE menu_items SET price = 1200 WHERE id = '0ccce92d-23a3-47ad-8ef8-622a13d353c2'; -- CHIVAS REGAL 12 YRS: ₹14 → ₹1200
UPDATE menu_items SET price = 1100 WHERE id = '04e7b5bb-270b-4c3c-b1c0-eec7e0d682ac'; -- DEWARS 12YRS: ₹11 → ₹1100
UPDATE menu_items SET price = 1100 WHERE id = '9443efea-e0d4-46ed-b08c-7d4039ca332d'; -- DEWARS WHITE LABEL: ₹9.5 → ₹1100
UPDATE menu_items SET price = 1500 WHERE id = '2265bbc9-ea2d-4ed5-9928-42aba219a77b'; -- GLENFIDDICH 12YRS: ₹13 → ₹1500
UPDATE menu_items SET price = 1500 WHERE id = '4e340b04-0e9f-47bc-ad62-c3b26e924bdd'; -- GLENLIVET 12YRS: ₹13 → ₹1500
UPDATE menu_items SET price = 1200 WHERE id = '0f2fd156-3467-4447-b940-25e6eb58b342'; -- INDRI SINGLE MALT: ₹12 → ₹1200
UPDATE menu_items SET price = 1100 WHERE id = '01c0136a-8151-4ed8-9914-ae8db248d2e1'; -- J & B RARE: ₹9.5 → ₹1100
UPDATE menu_items SET price = 1300 WHERE id = '31004295-c1dc-45cb-9d48-4dfabf9cf79a'; -- J.W BLACK LABEL: ₹12 → ₹1300
UPDATE menu_items SET price = 1300 WHERE id = 'cd515e2f-5a3e-4240-8b84-27b9e4016b1b'; -- J.W RED LABEL: ₹10 → ₹1300
UPDATE menu_items SET price = 1300 WHERE id = 'c7816fba-b009-4256-862f-b15bd0e86ed7'; -- J.W DOUBLE BLACK: ₹13 → ₹1300
UPDATE menu_items SET price = 1400 WHERE id = '798f3fc5-8a19-42b4-a554-01468c2393fc'; -- JACK DANIELS: ₹11 → ₹1400
UPDATE menu_items SET price = 1100 WHERE id = '66b9516a-9c9c-46a9-9fa1-4b0bb4c5330a'; -- JAMESON IRISH WHISKEY: ₹9 → ₹1100
UPDATE menu_items SET price = 900 WHERE id = 'a6c68fbe-08b7-4341-82ac-239a0855ae2a'; -- JIM BEAN: ₹8 → ₹900
UPDATE menu_items SET price = 1300 WHERE id = 'cf3dea56-f09a-4560-afc8-67863de76e7c'; -- MONKEY SHOULDER: ₹12.5 → ₹1300
UPDATE menu_items SET price = 1150 WHERE id = '35d0e46e-71f7-45d9-be3e-b4cccba3688f'; -- OAKSMITH GOLD: ₹10.5 → ₹1150
UPDATE menu_items SET price = 1400 WHERE id = 'a83690bb-6b65-4622-b06f-fe1e5b2a06ec'; -- PAUL JOHN BRILLIANCE: ₹13.5 → ₹1400
UPDATE menu_items SET price = 1400 WHERE id = '1aad61ba-4f82-498a-84a5-cbf32ba30c86'; -- PAUL JOHN BOLD: ₹15 → ₹1400
UPDATE menu_items SET price = 1200 WHERE id = '676ec0ce-0a0d-418b-b76d-d9400ed8d5ae'; -- SUNTORY TOKI: ₹11.5 → ₹1200
UPDATE menu_items SET price = 800 WHERE id = '127de202-1b1b-4f78-946d-aec18911a1c4'; -- TEACHER HIGHLAND: ₹8.5 → ₹800
UPDATE menu_items SET price = 800 WHERE id = 'ab485ccb-21f4-420a-bedd-e6ca9b0a60fd'; -- TEACHER 50: ₹9 → ₹800
UPDATE menu_items SET price = 1300 WHERE id = 'f2f0cf93-f7e1-41c1-9d4e-8ebec536e819'; -- AMRUT FUSION: ₹14 → ₹1300
-- Item not found: "BLACK GOD TRIPTW GOLD"
UPDATE menu_items SET price = 1100 WHERE id = '89a13ca8-7655-4055-bf42-4ac3047df5ea'; -- BUSHMILLS: ₹9.5 → ₹1100
UPDATE menu_items SET price = 750 WHERE id = 'e73f4145-bb4e-429d-8dc5-5f7937313708'; -- BEEFEATER: ₹9 → ₹750
UPDATE menu_items SET price = 800 WHERE id = '00d10d47-84fb-453a-b558-e9b8127ba8c0'; -- BOMBAY SAPPHIRE: ₹9.5 → ₹800
UPDATE menu_items SET price = 700 WHERE id = '710b0935-3d3b-43f4-8d57-e6b27bbb6867'; -- GORDONS: ₹8.5 → ₹700
UPDATE menu_items SET price = 750 WHERE id = '25899b69-f70f-4d72-b148-78603188131e'; -- GREATER THAN: ₹9 → ₹750
UPDATE menu_items SET price = 900 WHERE id = '30ed1d3b-fb17-4757-82a6-93bac368497c'; -- JAISALMER: ₹11 → ₹900
UPDATE menu_items SET price = 850 WHERE id = 'b1a66a82-3b00-4279-95d0-1f346519e39f'; -- TANQUERY: ₹10 → ₹850
UPDATE menu_items SET price = 700 WHERE id = '9d5150db-a9c3-40de-b693-f28b95c2ce04'; -- ABSOLUTE: ₹8 → ₹700
UPDATE menu_items SET price = 1200 WHERE id = '4ebd9f3e-f9d6-4f88-b4db-27bb4ebb8fdc'; -- GREY GOOSE: ₹12 → ₹1200
UPDATE menu_items SET price = 1000 WHERE id = '1e6beebe-e1d0-48ce-8027-98362874451e'; -- KETEL ONE: ₹11 → ₹1000
UPDATE menu_items SET price = 650 WHERE id = 'c39756a1-38c0-4e49-b44b-c40ea8165685'; -- SMIRNOFF: ₹7 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '63e12686-837c-4d43-b655-4411a5056538'; -- SMIRNOFF FLAVOUR: ₹8 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '58ce9026-5335-461e-89fd-12915b4eb324'; -- BACARDI BLACK: ₹9 → ₹650
UPDATE menu_items SET price = 650 WHERE id = 'bd018b90-020a-4e1b-a402-4990ffd74d41'; -- BACARDI CARTA BLANCA: ₹8.5 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '59aa913c-625a-4fad-9161-3b8155d090d9'; -- BACARDI LIMON: ₹9.5 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '6ae7e006-c11f-49fb-b77c-c486c5223760'; -- BACARDI LEMON CHILLI: ₹10 → ₹650
UPDATE menu_items SET price = 650 WHERE id = 'd54faf20-1321-422b-a79f-bb64af3f394f'; -- BACARDI MANGO CHILLI: ₹10 → ₹650
UPDATE menu_items SET price = 800 WHERE id = '6a3742d1-f217-4752-b305-a5e6040671e9'; -- OLD MONK DARK: ₹8 → ₹800
UPDATE menu_items SET price = 800 WHERE id = 'cff89622-955e-467c-83d2-0c5128927653'; -- OLD MONK WHITE: ₹7.5 → ₹800
UPDATE menu_items SET price = 750 WHERE id = 'c02c4b5f-5c76-416a-a5e0-d34d4a0caeb1'; -- HONEY BEE: ₹8 → ₹750
UPDATE menu_items SET price = 800 WHERE id = '8b4840c7-efe5-40e6-8b80-00c9b5efcc1c'; -- MANSON HOUSE: ₹9 → ₹800
UPDATE menu_items SET price = 600 WHERE id = '99da605a-d716-420e-884e-d4cc5b3667ea'; -- WHITE WINE: ₹8 → ₹600
-- Item not found: "RED WINE"
UPDATE menu_items SET price = 800 WHERE id = 'e7671559-c2d9-4275-aefa-d71cee569951'; -- NOI SPARKLING: ₹10 → ₹800
UPDATE menu_items SET price = 700 WHERE id = 'a1d0757d-0a65-4569-97bb-be629c6e6c95'; -- CHANDON BRUT: ₹13 → ₹700
UPDATE menu_items SET price = 650 WHERE id = '733b532d-9088-4ae1-ad1e-6760d6beaa6a'; -- FRATELLI CLASSIC SHIRAZ: ₹11 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '67845d31-5e55-4724-9ce9-43a5ef9ad969'; -- FRATELLI MERLOT: ₹10.5 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '99fd2739-4b0c-4537-8c86-a36fae592dff'; -- FRATELLI SAUVIGNON BLANC: ₹10 → ₹650
UPDATE menu_items SET price = 650 WHERE id = 'd8f66c09-1422-4ec5-986c-a7a2b095a3ab'; -- FRATELLI ROSE: ₹9.5 → ₹650
UPDATE menu_items SET price = 600 WHERE id = '58a3bee6-2849-457a-95ff-cacb995f07d1'; -- JACOBS CREEK CHARDONY: ₹9 → ₹600
UPDATE menu_items SET price = 600 WHERE id = '3668b172-6158-4857-8678-de1ff492ad90'; -- JACOBS CREEK SHIRAZ: ₹9.5 → ₹600
UPDATE menu_items SET price = 650 WHERE id = '16085119-9fc2-4569-a5b4-1a6391a285cf'; -- SULA SATORI: ₹9 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '82acf9ee-90e9-4b5c-9118-2d6ce34c5ca2'; -- SULA CABERNET SHIRAZ: ₹10 → ₹650
UPDATE menu_items SET price = 650 WHERE id = 'dfbb7923-e872-4954-a686-872721f519d0'; -- SULA CHENIN BLANC: ₹8.5 → ₹650
UPDATE menu_items SET price = 650 WHERE id = '0ba2ebb7-6563-4d44-a267-cbcb7c7ecdf5'; -- SULA ZINDFINDEL ROSE: ₹9 → ₹650
UPDATE menu_items SET price = 650 WHERE id = 'c043d864-a9fe-4050-aab1-291d1957aa02'; -- SULA BRUT: ₹12 → ₹650
UPDATE menu_items SET price = 650 WHERE id = 'ebe06399-f11a-4780-baff-7915cae642de'; -- SULA SECO ROSE: ₹11 → ₹650
UPDATE menu_items SET price = 600 WHERE id = '7cb11090-e8e1-4c35-8559-360d4692b01b'; -- WHISKEY SOUR: ₹13 → ₹600
UPDATE menu_items SET price = 650 WHERE id = 'a7a2f016-a066-49ca-aecd-964fef426573'; -- COSMOPOLIATAN: ₹13 → ₹650
UPDATE menu_items SET price = 700 WHERE id = '1b9dbcae-a155-4852-bf46-e972aa17fcc5'; -- ESSPRESSO MARTINI: ₹13.5 → ₹700
UPDATE menu_items SET price = 600 WHERE id = '1865ac23-87c4-4814-aae6-e1b501ae0d3b'; -- MOJITO: ₹12 → ₹600
UPDATE menu_items SET price = 650 WHERE id = 'c9ce4243-62ae-4a74-a6d5-2b131b388efb'; -- MARGARITA: ₹12.5 → ₹650
UPDATE menu_items SET price = 700 WHERE id = '804ff63c-5dd4-4e6b-96df-e0b13747acec'; -- MANHATTAN: ₹15 → ₹700
UPDATE menu_items SET price = 600 WHERE id = '2b48d451-25f8-4fda-83cd-d420ff47c044'; -- OLD FASHIONED: ₹14 → ₹600
UPDATE menu_items SET price = 550 WHERE id = '29c715c9-471a-4b0d-b779-0091d68fed90'; -- MAI TAI: ₹14 → ₹550
UPDATE menu_items SET price = 600 WHERE id = '712a5d54-6499-4c82-bd65-8e92ea53dc9a'; -- ALPHONSO AFFAIRS [RATNAGIRI REGION]: ₹12 → ₹600
UPDATE menu_items SET price = 600 WHERE id = '5022833b-a6d8-4c55-94f9-04fc5d14789e'; -- KOKAN COASTAL BREEZE [KOKAN REIGION]: ₹12 → ₹600
UPDATE menu_items SET price = 600 WHERE id = '1ee17402-2253-4a0d-944d-be24c57e4277'; -- KOLHAPURI HEATWAVE [KOLHAPURI]: ₹12 → ₹600
UPDATE menu_items SET price = 600 WHERE id = '2264bc20-4937-4716-b962-77b3167f3918'; -- MALVANI SMOKE [MALVAN REGION]: ₹12 → ₹600
UPDATE menu_items SET price = 600 WHERE id = '4d8d5665-592c-4f89-a59f-84fb83ae3b49'; -- NAGPUR CITRUS SMASH [NAGPUR REGION]: ₹11 → ₹600
UPDATE menu_items SET price = 600 WHERE id = 'a909d332-671b-4f72-bac0-4a6ff8aee4a2'; -- NASHIK VINEYARD SPRITZ [NASHIK REGION]: ₹12 → ₹600
UPDATE menu_items SET price = 600 WHERE id = 'a20b484a-feeb-46f3-aada-8fa320120ef8'; -- PUNE SPICE ROUTE [PUNE REGION]: ₹11 → ₹600
UPDATE menu_items SET price = 600 WHERE id = 'a280eeb7-1d7e-462d-b7fb-a127fc2e07c7'; -- SATARA BLOOM [SATARA/KASS PATHAR REGION]: ₹11 → ₹600
UPDATE menu_items SET price = 600 WHERE id = '10290db0-3cc0-44aa-a811-49adedeced6e'; -- BAILEYS: ₹9.5 → ₹600
UPDATE menu_items SET price = 550 WHERE id = '4234ee63-9051-466e-b74f-52189f64c0b2'; -- CAMPARI: ₹7.5 → ₹550
UPDATE menu_items SET price = 650 WHERE id = 'd48b86b8-c1ca-4f43-bba4-4655fb153b8e'; -- JAGERMEISTER: ₹9 → ₹650
UPDATE menu_items SET price = 600 WHERE id = '90ded53c-d3ae-4803-9ded-fb6b7a909186'; -- KAHLUA: ₹9 → ₹600
UPDATE menu_items SET price = 550 WHERE id = '2ec6e1d5-ca98-44a7-a716-60b43966e017'; -- MARTINI BIANCO: ₹8 → ₹550
UPDATE menu_items SET price = 550 WHERE id = 'f03ab93b-0a07-4369-96b1-62c8e5b78cca'; -- MARTINI ROSSO: ₹8 → ₹550
UPDATE menu_items SET price = 600 WHERE id = '82d5d2dc-f4bb-4cdd-bf2c-396f4a92a8a9'; -- SAMBUCA: ₹8.5 → ₹600
UPDATE menu_items SET price = 300 WHERE id = 'cb00655a-9022-404e-9c43-9b5b24d2cb77'; -- AAMCHI AAG: ₹7.5 → ₹300
UPDATE menu_items SET price = 350 WHERE id = '031d3e5e-09b5-405e-970e-d467304e3d67'; -- GOA GONE WILD: ₹8.5 → ₹350
UPDATE menu_items SET price = 300 WHERE id = '282a6b9c-1c49-4631-8c67-e6f7ffe433ee'; -- KOKUM HITMAN: ₹8 → ₹300
UPDATE menu_items SET price = 300 WHERE id = 'ca4a0946-28f3-47a1-be26-7fa6e8b6a239'; -- KOLHAPUR KICK: ₹8 → ₹300
UPDATE menu_items SET price = 300 WHERE id = '56e2bb01-1526-4389-ab2d-048d58e87828'; -- NAGPUR NITRO: ₹8 → ₹300
UPDATE menu_items SET price = 300 WHERE id = 'c1ae891f-3d08-4ecb-94e8-500c29810533'; -- PUNE POISION: ₹8 → ₹300
UPDATE menu_items SET price = 300 WHERE id = '27d92e12-60f3-468f-b490-5fdbc4dfb91b'; -- SAHYADRI SMORE: ₹7.5 → ₹300
UPDATE menu_items SET price = 250 WHERE id = 'eafbe056-4527-4331-9594-024414df98d3'; -- ALIBAUGH DRIFTS: ₹7 → ₹250
UPDATE menu_items SET price = 250 WHERE id = '3dfd7e3c-fbba-489b-ba3a-a1961759d05b'; -- BASIL BAZAR: ₹7.5 → ₹250
UPDATE menu_items SET price = 250 WHERE id = 'f556b2d8-5df8-44c8-a3ea-8cc1b80a3344'; -- DECCAN DEW: ₹7 → ₹250
UPDATE menu_items SET price = 250 WHERE id = 'e9814191-a3de-4d7c-ba79-91e137aaa88c'; -- GOLDEN HALO: ₹7.5 → ₹250
UPDATE menu_items SET price = 250 WHERE id = '87ee8628-30d2-4cfe-9dcd-38c48b4e2d46'; -- KOKUM CLOUD: ₹7 → ₹250
UPDATE menu_items SET price = 250 WHERE id = '79505cb2-ac3a-4737-a3c1-de5b6afd6328'; -- MAHABALESHWAR FODD: ₹7.5 → ₹250
UPDATE menu_items SET price = 250 WHERE id = '046be905-34c2-4177-9d00-f957461113c1'; -- MARINE ILLUSION: ₹7 → ₹250
UPDATE menu_items SET price = 250 WHERE id = '469a4050-224a-46bb-beba-e2dd4a4dfe3d'; -- MIRCHI MIRAGE: ₹7 → ₹250
UPDATE menu_items SET price = 300 WHERE id = '7c99b3de-66ea-4170-9a7b-52985792c920'; -- BLUEBERRY: ₹7 → ₹300
UPDATE menu_items SET price = 300 WHERE id = 'd05e5cea-21c7-4de8-b18a-6b1ab6e73ba6'; -- CRANBERRY: ₹7 → ₹300
UPDATE menu_items SET price = 300 WHERE id = '7730b518-3517-4a49-87f8-61525498358d'; -- JAMAICAN: ₹7 → ₹300
UPDATE menu_items SET price = 300 WHERE id = '1bd02c64-c9fb-4fd1-b9be-e81b1b9f57f8'; -- MANGO: ₹7 → ₹300

-- Total items to update: 107
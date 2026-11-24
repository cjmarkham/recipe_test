INSERT INTO recipes (name, ingredients, calories, protein)
VALUES
-- Chicken
('Grilled Chicken and Rice',
 ARRAY['chicken', 'rice', 'broccoli', 'olive oil'], 520, 48),

('Chicken Caesar Salad',
 ARRAY['chicken', 'lettuce', 'parmesan', 'croutons', 'caesar dressing'], 430, 38),

('Chicken Stir Fry',
 ARRAY['chicken', 'peppers', 'onion', 'broccoli', 'soy sauce', 'rice'], 480, 42),

('Chicken Fajitas',
 ARRAY['chicken', 'peppers', 'onion', 'tortilla', 'salsa'], 590, 45),

('Chicken and Avocado Wrap',
 ARRAY['chicken', 'avocado', 'lettuce', 'tortilla', 'yoghurt'], 510, 39),

('Chicken Curry',
 ARRAY['chicken', 'rice', 'tomatoes', 'onion', 'curry spices', 'coconut milk'], 680, 41),

-- Beef
('Beef Chilli',
 ARRAY['beef', 'kidney beans', 'tomatoes', 'onion', 'chilli'], 560, 44),

('Beef and Broccoli',
 ARRAY['beef', 'broccoli', 'soy sauce', 'garlic', 'rice'], 530, 43),

('Spaghetti Bolognese',
 ARRAY['beef', 'pasta', 'tomatoes', 'onion', 'garlic'], 650, 38),

('Beef Burger',
 ARRAY['beef', 'bread', 'lettuce', 'tomatoes', 'cheese'], 720, 42),

('Beef Tacos',
 ARRAY['beef', 'tortilla', 'lettuce', 'tomatoes', 'salsa'], 580, 37),

-- Fish
('Salmon and Sweet Potato',
 ARRAY['salmon', 'sweet potato', 'broccoli', 'olive oil'], 540, 40),

('Tuna Pasta Salad',
 ARRAY['tuna', 'pasta', 'sweetcorn', 'mayonnaise', 'lettuce'], 490, 36),

('Baked Cod and Vegetables',
 ARRAY['cod', 'courgette', 'peppers', 'potatoes', 'olive oil'], 390, 35),

('Prawn Stir Fry',
 ARRAY['prawns', 'rice', 'peppers', 'broccoli', 'soy sauce'], 420, 34),

-- Vegetarian
('Vegetable Stir Fry',
 ARRAY['rice', 'broccoli', 'peppers', 'carrots', 'soy sauce'], 350, 12),

('Chickpea Curry',
 ARRAY['chickpeas', 'tomatoes', 'onion', 'spinach', 'rice', 'curry spices'], 510, 19),

('Lentil Soup',
 ARRAY['lentils', 'carrots', 'onion', 'celery', 'vegetable stock'], 290, 18),

('Vegetarian Chilli',
 ARRAY['kidney beans', 'black beans', 'tomatoes', 'peppers', 'onion'], 410, 22),

('Tofu Stir Fry',
 ARRAY['tofu', 'rice', 'broccoli', 'peppers', 'soy sauce'], 460, 27),

('Spinach and Feta Omelette',
 ARRAY['eggs', 'spinach', 'feta', 'olive oil'], 340, 25),

('Mushroom Risotto',
 ARRAY['rice', 'mushrooms', 'parmesan', 'onion', 'vegetable stock'], 490, 16),

-- Breakfast / light meals
('Scrambled Eggs on Toast',
 ARRAY['eggs', 'bread', 'butter', 'milk'], 390, 23),

('Greek Yoghurt and Berries',
 ARRAY['greek yoghurt', 'blueberries', 'strawberries', 'honey'], 250, 21),

('Protein Porridge',
 ARRAY['oats', 'milk', 'protein powder', 'banana'], 440, 35),

('Peanut Butter Banana Toast',
 ARRAY['bread', 'peanut butter', 'banana'], 380, 13),

('Avocado and Eggs on Toast',
 ARRAY['avocado', 'eggs', 'bread'], 450, 22),

-- Additional high-protein meals
('Turkey Meatballs and Pasta',
 ARRAY['turkey', 'pasta', 'tomatoes', 'garlic', 'parmesan'], 570, 49),

('Chicken and Quinoa Bowl',
 ARRAY['chicken', 'quinoa', 'spinach', 'avocado', 'tomatoes'], 550, 46),

('Tuna and Bean Salad',
 ARRAY['tuna', 'kidney beans', 'lettuce', 'tomatoes', 'olive oil'], 370, 39);
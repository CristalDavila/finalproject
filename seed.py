from app import app
from models import Users, Goals, db, Entries

def seed_users():
    
    users_data = [
        {'user_id': '1',  'username': 'Cristal', 'password': '1234', 'email': 'cristal@email.com', 'image':  'assets/usericons/Cristal.jpg'},
        {'user_id': '2', 'username': 'Baran', 'password': '1234', 'email': 'baran@email.com', 'image':  'assets/usericons/Baran.jpg'},
        {'user_id': '3', 'username': 'Sky', 'password': '1234', 'email': 'sky@email.com', 'image':  'assets/usericons/Sky.jpg'},
        {'user_id': '4', 'username': 'Kam', 'password': '1234', 'email': 'kam@email.com', 'image':  'assets/usericons/Kam.jpg'},
        {'user_id': '5', 'username': 'Tri', 'password': '1234', 'email': 'tri@email.com', 'image':  'assets/usericons/Tri.jpg'},
        {'user_id': '6', 'username': 'Terence', 'password': '1234', 'email': 'terence@email.com', 'image':  'assets/usericons/Terence.jpg'},
        {'user_id': '7', 'username': 'Juan', 'password': '1234', 'email': 'juan@email.com',  'image':  'assets/usericons/Juan.jpg'},
        {'user_id': '8', 'username': 'Sam', 'password': '1234', 'email': 'sam@email.com',  'image':  'assets/usericons/Sam.jpg'},
        {'user_id': '9', 'username': 'David', 'password': '1234', 'email': 'david9@email.com', 'image':  'assets/usericons/David.jpg'},
        {'user_id': '10', 'username': 'Ryan','password': '1234', 'email': 'ryan@email.com', 'image':  'assets/usericons/Ryan.jpg'},
        {'user_id': '11', 'username': 'Jake', 'password': '1234', 'email': 'jake@email.com', 'image':  'assets/usericons/Jake.jpg'},
        {'user_id':'12', 'username': 'Yesenia', 'password': '1234', 'email':'yesenia@email.com', 'image': 'assets/usericons/Yesenia.jpg'}
    ]
    

    for user_data in users_data:
        user = Users(**user_data)
        db.session.add(user)

    db.session.commit()

def seed_goals():
    
    goals = [
        {'goal_id': '1', 'goal_name': 'Exercise', 'description': 'Stay fit and healthy.', 'image': 'assets/goalicons/exercise.jpg'},
        {'goal_id': '2', 'goal_name': 'Read', 'description': 'Expand your knowledge.', 'image': 'assets/goalicons/readabook2.jpg'},
        {'goal_id': '3', 'goal_name': 'Meditate', 'description': 'Maintain mental health.', 'image': 'assets/goalicons/meditation.jpg'},
        {'goal_id': '4', 'goal_name': 'Eat Healthy Food', 'description': 'Cut back on processed food to feel better.', 'image': 'assets/goalicons/healthyeating.jpg'},
        {'goal_id': '5', 'goal_name': 'Practice Coding', 'description': 'Keep improving on coding skills', 'image': 'assets/goalicons/study.jpg'},
        {'goal_id': '6', 'goal_name': 'Arrive on Time', 'description': 'Show up on time or early.', 'image': 'assets/goalicons/ontime.jpg'},
        {'goal_id': '7', 'goal_name': 'Get 8 Hours of Sleep', 'description': 'Get enough sleep', 'image': 'assets/goalicons/goodsleep.jpg'},
        {'goal_id': '8', 'goal_name': 'Walk the Dog', 'description': 'Get exercise and quality time with the pup', 'image': 'assets/goalicons/walkthedog.jpg'},
        {'goal_id': '9', 'goal_name': 'Cook instead of ordering', 'description': 'Save money and eat better', 'image': 'assets/goalicons/savingmoney.jpg'},
        {'goal_id': '10', 'goal_name': 'Beat Video Game', 'description': 'Beat the game', 'image': 'assets/goalicons/videogame.jpg'},
        {'goal_id': '11', 'goal_name': 'Yoga', 'description':'Practice Yoga', 'image': 'assets/goalicons/yogacat.jpg'},
        {'goal_id': '12', 'goal_name': 'Tai Chi', 'description':'Practice Tai Chi', 'image': 'assets/goalicons/taichi.jpg'},
    ]

    for goal_data in goals:
        print(goal_data)
        goal = Goals(goal_name=goal_data['goal_name'], description=goal_data['description'], image=goal_data['image'])
        db.session.add(goal)
    
def seed_entries():

        entries = [
            {'entries_id':'1', 'username': 'Willow', 'three_things_accomplished': 'bark', 'what_went_well': 'bark', 'what_blocked_progress': 'bark','plans_moving_forward':'bark bark bark', 'custom': 'barkbark', 'date': 'datetime'}
        ]

        for entry_data in entries:
            print(entry_data)
            entry = Entries(entries_id=entry_data['entries_id'],username=entry_data['username'], three_things_accomplished=entry_data['three_things_accomplished'], what_went_well=entry_data['what_went_well'], what_blocked_progress=entry_data['what_blocked_progress'], plans_moving_forward=entry_data['plans_moving_forward'], custom=entry_data['custom'], date=entry_data['date'])
            db.session.add(entry)
            db.session.commit()



if __name__ == '__main__':
    with app.app_context():
        # db.create_all()
        Users.query.delete()
        print("seeding goals!")
        seed_goals()
        print('finished seeding goals!')
        seed_users()
        seed_entries()

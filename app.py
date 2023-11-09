from flask import Flask, jsonify, session, request
from models import db, Users, Goals, Reminders, Entries, Resources
from config import app


@app.route('/')
def home():
    return ''

# GET users
@app.route('/users/<username>', methods=['GET'])
def get_user(username):
    user = Users.query.filter_by(username=username).first()
    if user:
        user_data = {
            'user_id': user.user_id,
            'username': user.username,
            'email': user.email,
            'password': user.password,
            'image': user.image,
        }
        return jsonify(user_data), 200
    else:
        return jsonify({"message": "User not found"}), 404

@app.route('/users', methods=['GET'])
def get_current_user():
    print(session)
    user_id = session.get('user_id')  # Getting the user ID from the session
    if user_id:
        user = Users.query.get(user_id)
        if user:
            # Serialize and return user data, excluding sensitive information
            return jsonify({
                'username': user.username,
                'id': user.user_id,
                'image': user.image
                # ... other user data fields
            }), 200
        else:
            # User ID was in session but no user was found with that ID
            return jsonify({"message": "User not found"}), 404
    else:
        # No user ID in session, meaning no user is logged in
        return jsonify({"message": "User not authenticated"}), 401
    

# DELETE user
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = Users.query.get(id)

    if not user:
        return jsonify({"Error": "User Not Found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"Message": "User deleted successfully"}), 204

# POST user
@app.route('/users', methods=['POST'])
def post_new_user():
    data = request.get_json()

    try:
        new_user = Users(
            username=data.get("username"),
            password=data.get("password"),
            email=data.get("email"),
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'username': new_user.username, 'email': new_user.email}), 201
    except ValueError:
        return jsonify({"Error": "Validation Error"}), 406

# POST resources
@app.route('/resources', methods=['POST'])
def post_resources():
    data = request.get_json()

    try:
        new_resource = Resources(
            resource_name=data.get("resource_name"),
            resource_type=data.get("resource_type"),
            url=data.get("url"),
        )

        db.session.add(new_resource)
        db.session.commit()

        return jsonify({'resource_name': new_resource.resource_name, 'resource_type': new_resource.resource_type, 'url': new_resource.url}), 201
    except ValueError:
        return jsonify({"Error": "Validation Error"}), 406

# GET goals
@app.route('/goals', methods=['GET'])
def get_goals():
    # goal_id = request.args.get('goal_id')
    # print(goal_id)
    goals = Goals.query.all()
    print(goals)
    r_array = []
    for goal in goals:
        goal_data = {
            'goal_id': goal.goal_id,
            'goal_name': goal.goal_name, 
            'description': goal.description, 
            'image': goal.image,
        }
        r_array.append(goal_data)
    return jsonify(r_array),200
    # else:
    #     return jsonify({'message': 'Goal not found'})


# GET journal entries
@app.route('/entries', methods=['GET'])
def get_entries():
    goal_entries = Entries.query.all()
    print(goal_entries)
    data = [{'entry_id': entry.entries_id, 'username':'entries.username', 'three_things_accomplished':'entries.three_things_accomplished', 'what_went_well':'entries.what_went_well',  'what_blocked_progress': 'entries.what_blocked_progress', 'custom': 'entries.custom'} for entry in goal_entries]
    
    return jsonify(data), 200

# POST goal entries
@app.route('/entries', methods=['POST'])
def post_entries():
    data = request.get_json()

    try:
        new_entry = Entries(
            goal_id=data.get("goal_id"),
            entries_id=data.get("entry_id")
        )

        db.session.add(new_entry)
        db.session.commit()

        return jsonify({'entry_id': 'entries.entry_id', 'username':'entries.username', 'three_things_accomplished':'entries.three_things_accomplished', 'what_went_well':'entries.what_went_well',  'what_blocked_progress': 'entries.what_blocked_progress', 'custom': 'entries.custom'}), 201
    except ValueError:
        return jsonify({"Error": "Validation Error"}), 406

# GET reminders
@app.route('/reminders', methods=['GET'])
def get_reminders():
    reminders = Reminders.query.all()
    data = [{'reminder_id': reminder.reminder_id, 'goal_id': reminder.goal_id, 'reminder_interval': reminder.reminder_interval, 'reminder_content': reminder.reminder_content} for reminder in reminders]

    return jsonify(data), 200

# Login and Logout with Session Management
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = Users.query.filter_by(username=username).first()

  # Stores user ID in the session
    if user and user.authenticate(username, password):
        session['user_id'] = user.user_id
        print(session.get('user_id'))
        return jsonify({ 'username': user.username, 'id': user.user_id,  'image': user.image}), 200
    else:
        return jsonify({"message": "Login failed"}), 401
 
if __name__ == '__main__':
    app.run(port=5555, debug=True)



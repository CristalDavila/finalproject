from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class Users(db.Model):
    __tablename__ = 'users_table'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    
    @classmethod
    def authenticate(cls, username, password):
        user = cls.query.filter_by(username=username).first()
        if user and user.password == password:
            return user
        return None

    # Foreign keys
    goals = db.relationship('Goals', back_populates='user', foreign_keys='Goals.user_id')
    entries = db.relationship('Entries', back_populates='user', foreign_keys='Entries.user_id')
    resources = db.relationship('Resources', back_populates='user', foreign_keys='Resources.user_id')

class Goals(db.Model):
    __tablename__ = 'goals_table'

    goal_id = db.Column(db.Integer, primary_key=True)
    goal_name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)

    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.user_id'))
    user = db.relationship('Users', back_populates='goals')
    
    reminders = db.relationship('Reminders', back_populates='goal')
    entries = db.relationship('GoalEntries', back_populates='goal')

class GoalEntries(db.Model):
    __tablename__ = 'goal_entries_table'

    goal_id = db.Column(db.Integer, db.ForeignKey('goals_table.goal_id'), primary_key=True)
    entries_id = db.Column(db.Integer, db.ForeignKey('entries_table.entries_id'), primary_key=True)

    # Define relationships
    goal = db.relationship('Goals', back_populates='entries')


class Entries(db.Model):
    __tablename__ = 'entries_table'

    entries_id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.String)
    username=db.Column(db.String)
    three_things_accomplished=db.Column(db.String)
    what_went_well = db.Column(db.String)
    what_blocked_progress= db.Column(db.String)
    plans_moving_forward = db.Column(db.String)
    custom = db.Column(db.String)


#foreign keys_
#I think for a one to many relationship the key goes in the child table, may be wrong.
    user = db.relationship('Users', back_populates='entries')
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.user_id'))


class Reminders(db.Model):
    __tablename__ = 'reminders_table'

    reminder_id = db.Column(db.Integer, primary_key = True)
    reminder_interval = db.Column(db.Interval) 
    reminder_content = db.Column(db.String)


     #foreign keys
    goal_id = db.Column(db.Integer, db.ForeignKey('goals_table.user_id'))
    reminder_goal_relationship = db.relationship('Goals', back_populates = 'reminders')

    goal = db.relationship('Goals', back_populates='reminders')


class Resources(db.Model):
    __tablename__ = 'resources_table'

    resource_id=db.Column(db.Integer, primary_key = True)
    resource_name = db.Column(db.String)
    resource_type = db.Column(db.String)
    url = db.Column(db.String)

    #foreign keys

    user_id = db.Column(db.Integer, db.ForeignKey('users_table.user_id'))
    user = db.relationship('Users', back_populates='resources')


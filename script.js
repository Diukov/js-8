const grades = {
  Junior: 'junior',
  Middle: 'middle',
  Senior: 'senior',
};

const bonuses = {
  'C++': 100,
  Rust: 150,
  default: 50,
};

const fines = {
  late: 20,
  deadline: 40,
  fail: 10,
  behavior: 5,
};

const gradeTax = {
  [grades.Junior]: 0.25,
  [grades.Middle]: 0.5,
  [grades.Senior]: 0.75,
};

function User(name, language, grade = grades.Junior) {
  this.name = name;
  this.grade = grade;
  this.salary = 1000;
  this.language = language;
  this.tasks = 0;
  this.doneTasks = 0;

  this.addTask = () => {
    this.tasks++;
  };

  this.finishTask = () => {
    if (this.tasks > 0) {
      this.tasks--;
      this.doneTasks++;
      this.salary +=
        (bonuses[this.language] || bonuses.default) * gradeTax[this.grade];
    }
  };

  this.upgrade = () => {
    if (this.doneTasks > 2 && [this.grade] == grades.Junior) {
      this.doneTasks -= 3;
      this.grade = grades.Middle;
      return this.grade;
    } else if (this.doneTasks > 4 && [this.grade] == grades.Middle) {
      this.doneTasks -= 5;
      this.grade = grades.Senior;
      return this.grade;
    } else if ([this.grade] == grades.Senior) return this.grade;
  };

  this.fine = (fine) => {
    for (const key in fines) {
      if (fine == key) this.salary -= fines[key];
    }
  };
};

const user = new User('John', 'C++', grades.Junior);
const user1 = new User('Vasya', 'Rust', grades.Senior);
const user2 = new User('Nifertiti', 'Boo', grades.Middle);

user.addTask();
user.addTask();
user.addTask();
user1.addTask();
user1.addTask();
user2.addTask();
user2.addTask();

user.finishTask();
user.finishTask();
user.finishTask();
user1.finishTask();
user2.finishTask();
user2.finishTask();

user.fine('late');
user.fine('deadline');
user1.fine('behavior');
user2.fine('fail');

let resultUser = user.upgrade(),
resultUser1 = user1.upgrade(),
resultUser2 = user2.upgrade();

const result = (grade, user) => {
  grade ? console.log(`Cool! Now ${user.name}'s grade is ${grade}!`) : console.log(`${user.name} needs to do more tasks!`);
}

result(resultUser, user);
result(resultUser1, user1);
result(resultUser2, user2);
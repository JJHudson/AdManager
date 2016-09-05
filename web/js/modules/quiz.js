var Quiz = function(options, callback) {

	var currentQuestion = 0,
		questions = [],
		wrapper,
		settings = {
			id: 'js-quiz'
		};

	function init(options, settings) {

		wrapper = $('#'+settings.id);

		templates.add('quiz', 'quiz-template');

		helpers.mergeObjects(settings, options);

		templateQuiz(settings);

	}

	function templateQuiz(settings) {

		document.getElementById(wrapper[0]['id']).innerHTML = templates.get('quiz', settings);

		var count = 0;

		for(var question in settings.questions){
			questions[count] = {id: 'question'+count};
			count++;
		}

		createQuizSwitcher();
	}

	function createQuizSwitcher() {
		switcher = new Switcher({
            duration: 500,
<<<<<<< HEAD
            transition: swap,
||||||| merged common ancestors
            transition: transitions.fadeOutIn,
=======
            transition: 'swap',
>>>>>>> Update switcher
            sections : questions
        });
	}

	function startQuiz(){
		quizSwitcher.question0.show();
	}

	function selectAnswer(questionID, answerID) {
		data.quiz.questions[questionID].choice = answerID;
	}

	function clearAnswer(questionID) {
		data.quiz.questions[questionID].choice = "";
	}

	function getCurrentQuestion() {
		var question = data.quiz.questions[currentQuestion];
		question.position = currentQuestion;
		return question;
	}

	function goToQuestion(n) {
		n = n < 0 ? 0 : n;
		n = n > data.quiz.questions.length ? data.quiz.questions.length : n;
		currentQuestion = n;
	}

	function goToNextQuestion() {
		currentQuestion = currentQuestion+1;
	}

	function goToPrevQuestion() {
		currentQuestion = currentQuestion-1;
	}

	function finishQuiz() {
		var answers = [];
		for(var i in data.quiz.questions) {
			answers.push(data.quiz.questions[i].choice);
		}
		return {answers: answers, data: data};
	}

	init(options, settings);

	return {

		getCurrentQuestion: getCurrentQuestion,
		selectAnswer: selectAnswer,
		goToNextQuestion: goToNextQuestion,
		goToPrevQuestion: goToPrevQuestion,
		goToQuestion: goToQuestion,
		finishQuiz: finishQuiz,
		clearAnswer: clearAnswer

	};

};

var timer

var whichQuestion = 0

var win = 0

var lose = 0

var numberOfQuestions = 0

var stopWatch = {
	time: 30,
	intermediateTime: 1,

	start: function() {
		timer = setInterval(stopWatch.count, 1000)
	},

	count: function() {

		if (stopWatch.time === 0) {
			clearInterval(timer)
			stopWatch.time = 30
			lose += 1

			$('#Question').hide()
			$('.answer').hide()
			$('#result').show()
			$('#rightResult').show()
			$('#result').text("You missed the answer")
			$('#rightResult').text("The right answer is " + problemSet.question[whichQuestion].rightAnswer)
			timer = setInterval(stopWatch.intermediate, 1000)

			
		} else {
			stopWatch.time -= 1
			$('.Timer').text("Time Remaining: " + stopWatch.time + " Seconds")
		}
	},

	intermediate: function() {
		if(stopWatch.intermediateTime === 0){

			clearInterval(timer)
			stopWatch.intermediateTime = 1


			if(whichQuestion < numberOfQuestions-1){
				$('#Question').show()
				$('.answer').show()
				$('#result').hide()
				$('#rightResult').hide()
				whichQuestion += 1
				problemSet.refreshed(whichQuestion)
				stopWatch.start()
			} else {
				$('#result').show()
				$('#result').text("You have win: " + win + ", lose: " + lose)
				$('#rightResult').hide()

			}
			


		}else {
			stopWatch.intermediateTime--
		}

	}

}

var problemSet = {


	question:[{
		question: "Who is not a super hero?",
		lists: ['Spider Man', 'Batman', 'SuperMan', 'Venom'],
		answers:[true, true, true, false],
		rightAnswer:'Venom'
	},

	{
		question: "which one is not coffee shop?",
		lists: ['Starbuck', 'Coffee Bean', 'Mcdonald', 'Panera Bread'],
		answers: [true, true, false, true],
		rightAnswer: 'Mcdonald'
	}],
	refreshed: function(whichIndex) {
		
		$('#Question').text(problemSet.question[whichIndex].question)
		$('#one').attr('value', problemSet.question[whichIndex].answers[0]).text(problemSet.question[whichIndex].lists[0])
		$('#two').attr('value', problemSet.question[whichIndex].answers[1]).text(problemSet.question[whichIndex].lists[1])
		$('#three').attr('value', problemSet.question[whichIndex].answers[2]).text(problemSet.question[whichIndex].lists[2])
		$('#four').attr('value', problemSet.question[whichIndex].answers[3]).text(problemSet.question[whichIndex].lists[3])

	},
	numberOfQuestion: function(){
		numberOfQuestions = problemSet.question.length
		
	}

}
$(document).ready(function() {

	$('#Question').hide()
	$('.answer').hide()
	$('#result').hide()
	$('#rightResult').hide()


	$('#startButton').on('click', function(){

		$('#startButton').remove()
		$('#Question').show()
		$('.answer').show()
		problemSet.numberOfQuestion()
		problemSet.refreshed(whichQuestion)
		stopWatch.start()

	})

	$('.answer').on('click', function(){
		console.log("answer class was click")
		if($(this).val() === "false"){

			clearInterval(timer)
			stopWatch.time = 30
			$('#Question').hide()
			$('.answer').hide()
			$('#result').show()
			$('#result').text("This is correct answer")
			win += 1

			timer = setInterval(stopWatch.intermediate, 1000)

		} else if($(this).val() === "true") {

			clearInterval(timer)
			stopWatch.time = 30
			showCorrectAnswer(whichQuestion)
			lose += 1

			timer = setInterval(stopWatch.intermediate, 1000)

		}
	})


	function showCorrectAnswer(currentQuestion) {

		$('#Question').hide()
		$('.answer').hide()
		$('#result').show()
		$('#rightResult').show()
		$('#result').text("You have got wrong answer!")
		$('#rightResult').text("The right answer is " + problemSet.question[currentQuestion].rightAnswer)
	}



})

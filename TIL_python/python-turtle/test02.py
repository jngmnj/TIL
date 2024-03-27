
import turtle as t
t.bgcolor('black')
# t = turtle.Turtle()
colors=['red', 'dark red']
for number in range(400):
	t.forward(number+1)
	t.right(89)
	# 번갈아가면서
	t.pencolor(colors[number%2])



//read file
def file = new File("/tmp/test.txt")
def reader = new FileReader(file)
def bufferedReader = new BufferedReader(reader)
def line = bufferedReader.readLine()
while (line != null) {
    println(line)
    line = bufferedReader.readLine()
}
bufferedReader.close()
reader.close()

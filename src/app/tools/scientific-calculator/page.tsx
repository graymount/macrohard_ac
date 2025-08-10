'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator, 
  Delete, 
  RotateCcw,
  Divide,
  X,
  Minus,
  Plus,
  Equal,
  Percent,
  PlusSquare,
  MinusSquare,
  Hash
} from 'lucide-react'

type CalculatorMode = 'basic' | 'scientific' | 'programmer'

export default function ScientificCalculatorPage() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<string | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [memory, setMemory] = useState(0)
  const [mode, setMode] = useState<CalculatorMode>('scientific')
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg')

  const addToHistory = (calculation: string) => {
    setHistory(prev => [calculation, ...prev].slice(0, 10))
  }

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const clearEntry = () => {
    setDisplay('0')
  }

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const toggleSign = () => {
    const value = parseFloat(display)
    setDisplay(String(-value))
  }

  const percentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const performOperation = (nextOperation: string | null = null) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(display)
    } else if (operation) {
      const currentValue = parseFloat(previousValue)
      let newValue = currentValue

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue
          break
        case '-':
          newValue = currentValue - inputValue
          break
        case '*':
          newValue = currentValue * inputValue
          break
        case '/':
          newValue = inputValue !== 0 ? currentValue / inputValue : 0
          break
        case '^':
          newValue = Math.pow(currentValue, inputValue)
          break
        case 'mod':
          newValue = currentValue % inputValue
          break
      }

      const calculation = `${previousValue} ${operation} ${display} = ${newValue}`
      addToHistory(calculation)
      
      setDisplay(String(newValue))
      setPreviousValue(String(newValue))
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = () => {
    performOperation(null)
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(true)
  }

  // Scientific functions
  const scientificFunction = (func: string) => {
    const value = parseFloat(display)
    let result = 0
    let calculation = ''

    switch (func) {
      case 'sin':
        result = angleMode === 'deg' ? Math.sin(value * Math.PI / 180) : Math.sin(value)
        calculation = `sin(${value}) = ${result}`
        break
      case 'cos':
        result = angleMode === 'deg' ? Math.cos(value * Math.PI / 180) : Math.cos(value)
        calculation = `cos(${value}) = ${result}`
        break
      case 'tan':
        result = angleMode === 'deg' ? Math.tan(value * Math.PI / 180) : Math.tan(value)
        calculation = `tan(${value}) = ${result}`
        break
      case 'asin':
        result = angleMode === 'deg' ? Math.asin(value) * 180 / Math.PI : Math.asin(value)
        calculation = `asin(${value}) = ${result}`
        break
      case 'acos':
        result = angleMode === 'deg' ? Math.acos(value) * 180 / Math.PI : Math.acos(value)
        calculation = `acos(${value}) = ${result}`
        break
      case 'atan':
        result = angleMode === 'deg' ? Math.atan(value) * 180 / Math.PI : Math.atan(value)
        calculation = `atan(${value}) = ${result}`
        break
      case 'log':
        result = Math.log10(value)
        calculation = `log(${value}) = ${result}`
        break
      case 'ln':
        result = Math.log(value)
        calculation = `ln(${value}) = ${result}`
        break
      case 'sqrt':
        result = Math.sqrt(value)
        calculation = `√${value} = ${result}`
        break
      case 'cbrt':
        result = Math.cbrt(value)
        calculation = `∛${value} = ${result}`
        break
      case 'square':
        result = value * value
        calculation = `${value}² = ${result}`
        break
      case 'cube':
        result = value * value * value
        calculation = `${value}³ = ${result}`
        break
      case 'reciprocal':
        result = 1 / value
        calculation = `1/${value} = ${result}`
        break
      case 'factorial':
        result = factorial(Math.floor(value))
        calculation = `${Math.floor(value)}! = ${result}`
        break
      case 'exp':
        result = Math.exp(value)
        calculation = `e^${value} = ${result}`
        break
      case 'abs':
        result = Math.abs(value)
        calculation = `|${value}| = ${result}`
        break
    }

    addToHistory(calculation)
    setDisplay(String(result))
    setWaitingForNewValue(true)
  }

  const factorial = (n: number): number => {
    if (n < 0) return NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const constant = (name: string) => {
    let value = 0
    switch (name) {
      case 'pi':
        value = Math.PI
        break
      case 'e':
        value = Math.E
        break
    }
    setDisplay(String(value))
    setWaitingForNewValue(true)
  }

  // Memory functions
  const memoryStore = () => {
    setMemory(parseFloat(display))
  }

  const memoryRecall = () => {
    setDisplay(String(memory))
    setWaitingForNewValue(true)
  }

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display))
  }

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display))
  }

  const memoryClear = () => {
    setMemory(0)
  }

  // Programmer mode functions
  const convertBase = (value: number, toBase: number): string => {
    switch (toBase) {
      case 2:
        return value.toString(2)
      case 8:
        return value.toString(8)
      case 16:
        return value.toString(16).toUpperCase()
      default:
        return value.toString()
    }
  }

  const BasicButtons = () => (
    <>
      <div className="grid grid-cols-4 gap-2">
        <Button variant="secondary" onClick={clear} className="col-span-2">AC</Button>
        <Button variant="secondary" onClick={backspace}><Delete className="h-4 w-4" /></Button>
        <Button variant="secondary" onClick={() => performOperation('/')}>÷</Button>
        
        <Button variant="outline" onClick={() => handleNumber('7')}>7</Button>
        <Button variant="outline" onClick={() => handleNumber('8')}>8</Button>
        <Button variant="outline" onClick={() => handleNumber('9')}>9</Button>
        <Button variant="secondary" onClick={() => performOperation('*')}>×</Button>
        
        <Button variant="outline" onClick={() => handleNumber('4')}>4</Button>
        <Button variant="outline" onClick={() => handleNumber('5')}>5</Button>
        <Button variant="outline" onClick={() => handleNumber('6')}>6</Button>
        <Button variant="secondary" onClick={() => performOperation('-')}>−</Button>
        
        <Button variant="outline" onClick={() => handleNumber('1')}>1</Button>
        <Button variant="outline" onClick={() => handleNumber('2')}>2</Button>
        <Button variant="outline" onClick={() => handleNumber('3')}>3</Button>
        <Button variant="secondary" onClick={() => performOperation('+')}>+</Button>
        
        <Button variant="outline" onClick={toggleSign}>±</Button>
        <Button variant="outline" onClick={() => handleNumber('0')}>0</Button>
        <Button variant="outline" onClick={handleDecimal}>.</Button>
        <Button className="bg-primary" onClick={calculate}>=</Button>
      </div>
    </>
  )

  const ScientificButtons = () => (
    <>
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        <Button size="sm" variant="outline" onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}>
          {angleMode.toUpperCase()}
        </Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('sin')}>sin</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('cos')}>cos</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('tan')}>tan</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('factorial')}>n!</Button>
        
        <Button size="sm" variant="outline" onClick={() => constant('pi')}>π</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('asin')}>asin</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('acos')}>acos</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('atan')}>atan</Button>
        <Button size="sm" variant="outline" onClick={() => performOperation('mod')}>mod</Button>
        
        <Button size="sm" variant="outline" onClick={() => constant('e')}>e</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('log')}>log</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('ln')}>ln</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('exp')}>eˣ</Button>
        <Button size="sm" variant="outline" onClick={() => performOperation('^')}>xʸ</Button>
        
        <Button size="sm" variant="outline" onClick={() => scientificFunction('sqrt')}>√</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('cbrt')}>∛</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('square')}>x²</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('cube')}>x³</Button>
        <Button size="sm" variant="outline" onClick={() => scientificFunction('reciprocal')}>1/x</Button>
        
        <Button size="sm" variant="outline" onClick={memoryStore}>MS</Button>
        <Button size="sm" variant="outline" onClick={memoryRecall}>MR</Button>
        <Button size="sm" variant="outline" onClick={memoryAdd}>M+</Button>
        <Button size="sm" variant="outline" onClick={memorySubtract}>M-</Button>
        <Button size="sm" variant="outline" onClick={memoryClear}>MC</Button>
      </div>
      <BasicButtons />
    </>
  )

  const ProgrammerButtons = () => {
    const intValue = parseInt(display)
    return (
      <>
        <div className="space-y-2 mb-4">
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="col-span-1 font-medium">BIN:</div>
            <div className="col-span-3 font-mono">{convertBase(intValue, 2)}</div>
            <div className="col-span-1 font-medium">OCT:</div>
            <div className="col-span-3 font-mono">{convertBase(intValue, 8)}</div>
            <div className="col-span-1 font-medium">DEC:</div>
            <div className="col-span-3 font-mono">{intValue}</div>
            <div className="col-span-1 font-medium">HEX:</div>
            <div className="col-span-3 font-mono">{convertBase(intValue, 16)}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={() => handleNumber('D')} disabled>D</Button>
          <Button variant="outline" onClick={() => handleNumber('E')} disabled>E</Button>
          <Button variant="outline" onClick={() => handleNumber('F')} disabled>F</Button>
          <Button variant="secondary" onClick={clear}>AC</Button>
          
          <Button variant="outline" onClick={() => handleNumber('A')} disabled>A</Button>
          <Button variant="outline" onClick={() => handleNumber('B')} disabled>B</Button>
          <Button variant="outline" onClick={() => handleNumber('C')} disabled>C</Button>
          <Button variant="secondary" onClick={backspace}><Delete className="h-4 w-4" /></Button>
          
          <Button variant="outline" onClick={() => handleNumber('7')}>7</Button>
          <Button variant="outline" onClick={() => handleNumber('8')}>8</Button>
          <Button variant="outline" onClick={() => handleNumber('9')}>9</Button>
          <Button variant="secondary" onClick={() => performOperation('/')}>÷</Button>
          
          <Button variant="outline" onClick={() => handleNumber('4')}>4</Button>
          <Button variant="outline" onClick={() => handleNumber('5')}>5</Button>
          <Button variant="outline" onClick={() => handleNumber('6')}>6</Button>
          <Button variant="secondary" onClick={() => performOperation('*')}>×</Button>
          
          <Button variant="outline" onClick={() => handleNumber('1')}>1</Button>
          <Button variant="outline" onClick={() => handleNumber('2')}>2</Button>
          <Button variant="outline" onClick={() => handleNumber('3')}>3</Button>
          <Button variant="secondary" onClick={() => performOperation('-')}>−</Button>
          
          <Button variant="outline" onClick={() => handleNumber('0')} className="col-span-2">0</Button>
          <Button variant="secondary" onClick={() => performOperation('+')}>+</Button>
          <Button className="bg-primary" onClick={calculate}>=</Button>
        </div>
      </>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Scientific Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Advanced calculator for mathematics, physics, and engineering calculations
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
              <CardDescription>
                Choose between basic, scientific, and programmer modes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={(v) => setMode(v as CalculatorMode)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="scientific">Scientific</TabsTrigger>
                  <TabsTrigger value="programmer">Programmer</TabsTrigger>
                </TabsList>
                
                <div className="mt-4">
                  {/* Display */}
                  <div className="mb-4 p-4 bg-muted rounded-lg">
                    <div className="text-right">
                      {operation && previousValue && (
                        <div className="text-sm text-muted-foreground">
                          {previousValue} {operation}
                        </div>
                      )}
                      <div className="text-3xl font-mono font-bold">
                        {display}
                      </div>
                      {memory !== 0 && (
                        <div className="text-xs text-muted-foreground mt-1">
                          M: {memory}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <TabsContent value="basic">
                    <BasicButtons />
                  </TabsContent>
                  
                  <TabsContent value="scientific">
                    <ScientificButtons />
                  </TabsContent>
                  
                  <TabsContent value="programmer">
                    <ProgrammerButtons />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>History</CardTitle>
              <CardDescription>Recent calculations</CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <div key={index} className="text-sm font-mono p-2 bg-muted rounded">
                      {item}
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setHistory([])}
                  >
                    Clear History
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No calculations yet
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="font-semibold">Keyboard Shortcuts:</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>Numbers: 0-9</li>
                <li>Operations: +, -, *, /</li>
                <li>Equals: Enter or =</li>
                <li>Clear: Escape</li>
                <li>Backspace: Delete</li>
              </ul>
              
              <div className="font-semibold mt-4">Constants:</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>π = 3.14159...</li>
                <li>e = 2.71828...</li>
              </ul>
              
              <div className="font-semibold mt-4">Memory:</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>MS: Store in memory</li>
                <li>MR: Recall from memory</li>
                <li>M+: Add to memory</li>
                <li>M-: Subtract from memory</li>
                <li>MC: Clear memory</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About the Scientific Calculator</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              Our scientific calculator provides comprehensive mathematical functions for students, 
              engineers, and scientists. With support for basic arithmetic, trigonometry, logarithms, 
              and more, it's perfect for homework, research, and professional calculations.
            </p>
            
            <h3>Features:</h3>
            <ul>
              <li><strong>Basic Mode:</strong> Standard arithmetic operations</li>
              <li><strong>Scientific Mode:</strong> Trigonometric, logarithmic, and exponential functions</li>
              <li><strong>Programmer Mode:</strong> Binary, octal, decimal, and hexadecimal conversions</li>
              <li><strong>Memory Functions:</strong> Store and recall values</li>
              <li><strong>History Tracking:</strong> Review your recent calculations</li>
              <li><strong>Angle Modes:</strong> Switch between degrees and radians</li>
            </ul>

            <h3>Scientific Functions:</h3>
            <ul>
              <li>Trigonometric: sin, cos, tan, asin, acos, atan</li>
              <li>Logarithmic: log (base 10), ln (natural log)</li>
              <li>Exponential: eˣ, xʸ (power)</li>
              <li>Roots: Square root, cube root</li>
              <li>Special: Factorial, reciprocal, absolute value</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>For trigonometric functions, make sure you're in the correct angle mode (DEG or RAD)</li>
              <li>Use memory functions to store intermediate results in complex calculations</li>
              <li>The history panel keeps track of your last 10 calculations</li>
              <li>In programmer mode, enter decimal numbers to see instant conversions</li>
              <li>Chain operations are supported - the calculator follows standard order of operations</li>
              <li>For scientific notation, use the exp function (e.g., 1.23e5 = 1.23 × 10⁵)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
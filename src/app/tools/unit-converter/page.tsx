'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowLeftRight, Copy, RotateCcw } from 'lucide-react'

type ConversionCategory = 'length' | 'weight' | 'temperature' | 'volume' | 'area' | 'time' | 'speed' | 'data' | 'energy' | 'pressure'

interface ConversionUnit {
  name: string
  symbol: string
  factor: number // conversion factor to base unit
}

interface ConversionData {
  [category: string]: {
    name: string
    baseUnit: string
    units: ConversionUnit[]
  }
}

const conversionData: ConversionData = {
  length: {
    name: 'Length',
    baseUnit: 'meter',
    units: [
      { name: 'Kilometer', symbol: 'km', factor: 1000 },
      { name: 'Meter', symbol: 'm', factor: 1 },
      { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      { name: 'Micrometer', symbol: 'μm', factor: 0.000001 },
      { name: 'Nanometer', symbol: 'nm', factor: 0.000000001 },
      { name: 'Mile', symbol: 'mi', factor: 1609.344 },
      { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      { name: 'Inch', symbol: 'in', factor: 0.0254 },
      { name: 'Light Year', symbol: 'ly', factor: 9.461e15 },
      { name: 'Astronomical Unit', symbol: 'AU', factor: 1.496e11 }
    ]
  },
  weight: {
    name: 'Weight/Mass',
    baseUnit: 'kilogram',
    units: [
      { name: 'Metric Ton', symbol: 't', factor: 1000 },
      { name: 'Kilogram', symbol: 'kg', factor: 1 },
      { name: 'Gram', symbol: 'g', factor: 0.001 },
      { name: 'Milligram', symbol: 'mg', factor: 0.000001 },
      { name: 'Microgram', symbol: 'μg', factor: 0.000000001 },
      { name: 'Pound', symbol: 'lb', factor: 0.453592 },
      { name: 'Ounce', symbol: 'oz', factor: 0.0283495 },
      { name: 'Stone', symbol: 'st', factor: 6.35029 },
      { name: 'US Ton', symbol: 'ton (US)', factor: 907.185 },
      { name: 'Imperial Ton', symbol: 'ton (UK)', factor: 1016.05 }
    ]
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'celsius',
    units: [
      { name: 'Celsius', symbol: '°C', factor: 1 },
      { name: 'Fahrenheit', symbol: '°F', factor: 1 }, // special handling
      { name: 'Kelvin', symbol: 'K', factor: 1 }, // special handling
      { name: 'Rankine', symbol: '°R', factor: 1 } // special handling
    ]
  },
  volume: {
    name: 'Volume',
    baseUnit: 'liter',
    units: [
      { name: 'Cubic Meter', symbol: 'm³', factor: 1000 },
      { name: 'Liter', symbol: 'L', factor: 1 },
      { name: 'Milliliter', symbol: 'mL', factor: 0.001 },
      { name: 'Cubic Centimeter', symbol: 'cm³', factor: 0.001 },
      { name: 'US Gallon', symbol: 'gal (US)', factor: 3.78541 },
      { name: 'US Quart', symbol: 'qt (US)', factor: 0.946353 },
      { name: 'US Pint', symbol: 'pt (US)', factor: 0.473176 },
      { name: 'US Cup', symbol: 'cup', factor: 0.236588 },
      { name: 'US Fluid Ounce', symbol: 'fl oz', factor: 0.0295735 },
      { name: 'US Tablespoon', symbol: 'tbsp', factor: 0.0147868 },
      { name: 'US Teaspoon', symbol: 'tsp', factor: 0.00492892 },
      { name: 'Imperial Gallon', symbol: 'gal (UK)', factor: 4.54609 },
      { name: 'Imperial Quart', symbol: 'qt (UK)', factor: 1.13652 },
      { name: 'Imperial Pint', symbol: 'pt (UK)', factor: 0.568261 }
    ]
  },
  area: {
    name: 'Area',
    baseUnit: 'square meter',
    units: [
      { name: 'Square Kilometer', symbol: 'km²', factor: 1000000 },
      { name: 'Hectare', symbol: 'ha', factor: 10000 },
      { name: 'Square Meter', symbol: 'm²', factor: 1 },
      { name: 'Square Centimeter', symbol: 'cm²', factor: 0.0001 },
      { name: 'Square Millimeter', symbol: 'mm²', factor: 0.000001 },
      { name: 'Square Mile', symbol: 'mi²', factor: 2589988 },
      { name: 'Acre', symbol: 'ac', factor: 4046.86 },
      { name: 'Square Yard', symbol: 'yd²', factor: 0.836127 },
      { name: 'Square Foot', symbol: 'ft²', factor: 0.092903 },
      { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 }
    ]
  },
  time: {
    name: 'Time',
    baseUnit: 'second',
    units: [
      { name: 'Year', symbol: 'yr', factor: 31536000 },
      { name: 'Month', symbol: 'mo', factor: 2628000 },
      { name: 'Week', symbol: 'wk', factor: 604800 },
      { name: 'Day', symbol: 'd', factor: 86400 },
      { name: 'Hour', symbol: 'h', factor: 3600 },
      { name: 'Minute', symbol: 'min', factor: 60 },
      { name: 'Second', symbol: 's', factor: 1 },
      { name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      { name: 'Microsecond', symbol: 'μs', factor: 0.000001 },
      { name: 'Nanosecond', symbol: 'ns', factor: 0.000000001 }
    ]
  },
  speed: {
    name: 'Speed',
    baseUnit: 'meter per second',
    units: [
      { name: 'Meter per second', symbol: 'm/s', factor: 1 },
      { name: 'Kilometer per hour', symbol: 'km/h', factor: 0.277778 },
      { name: 'Mile per hour', symbol: 'mph', factor: 0.44704 },
      { name: 'Foot per second', symbol: 'ft/s', factor: 0.3048 },
      { name: 'Knot', symbol: 'kn', factor: 0.514444 },
      { name: 'Speed of light', symbol: 'c', factor: 299792458 },
      { name: 'Mach', symbol: 'Ma', factor: 340.29 }
    ]
  },
  data: {
    name: 'Digital Storage',
    baseUnit: 'byte',
    units: [
      { name: 'Bit', symbol: 'bit', factor: 0.125 },
      { name: 'Byte', symbol: 'B', factor: 1 },
      { name: 'Kilobyte', symbol: 'KB', factor: 1024 },
      { name: 'Megabyte', symbol: 'MB', factor: 1048576 },
      { name: 'Gigabyte', symbol: 'GB', factor: 1073741824 },
      { name: 'Terabyte', symbol: 'TB', factor: 1099511627776 },
      { name: 'Petabyte', symbol: 'PB', factor: 1125899906842624 },
      { name: 'Kilobit', symbol: 'Kbit', factor: 128 },
      { name: 'Megabit', symbol: 'Mbit', factor: 131072 },
      { name: 'Gigabit', symbol: 'Gbit', factor: 134217728 }
    ]
  },
  energy: {
    name: 'Energy',
    baseUnit: 'joule',
    units: [
      { name: 'Joule', symbol: 'J', factor: 1 },
      { name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      { name: 'Calorie', symbol: 'cal', factor: 4.184 },
      { name: 'Kilocalorie', symbol: 'kcal', factor: 4184 },
      { name: 'Watt-hour', symbol: 'Wh', factor: 3600 },
      { name: 'Kilowatt-hour', symbol: 'kWh', factor: 3600000 },
      { name: 'Electronvolt', symbol: 'eV', factor: 1.60218e-19 },
      { name: 'British thermal unit', symbol: 'BTU', factor: 1055.06 },
      { name: 'Foot-pound', symbol: 'ft⋅lb', factor: 1.35582 }
    ]
  },
  pressure: {
    name: 'Pressure',
    baseUnit: 'pascal',
    units: [
      { name: 'Pascal', symbol: 'Pa', factor: 1 },
      { name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      { name: 'Bar', symbol: 'bar', factor: 100000 },
      { name: 'Millibar', symbol: 'mbar', factor: 100 },
      { name: 'Atmosphere', symbol: 'atm', factor: 101325 },
      { name: 'Torr', symbol: 'Torr', factor: 133.322 },
      { name: 'Pounds per square inch', symbol: 'psi', factor: 6894.76 },
      { name: 'Millimeter of mercury', symbol: 'mmHg', factor: 133.322 }
    ]
  }
}

export default function UnitConverterPage() {
  const [category, setCategory] = useState<ConversionCategory>('length')
  const [fromUnit, setFromUnit] = useState<string>('Meter')
  const [toUnit, setToUnit] = useState<string>('Foot')
  const [fromValue, setFromValue] = useState<string>('1')
  const [toValue, setToValue] = useState<string>('')
  const [history, setHistory] = useState<string[]>([])

  // Convert temperature with special formulas
  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius = value
    
    // Convert to Celsius first
    switch (from) {
      case 'Fahrenheit':
        celsius = (value - 32) * 5/9
        break
      case 'Kelvin':
        celsius = value - 273.15
        break
      case 'Rankine':
        celsius = (value - 491.67) * 5/9
        break
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'Celsius':
        return celsius
      case 'Fahrenheit':
        return celsius * 9/5 + 32
      case 'Kelvin':
        return celsius + 273.15
      case 'Rankine':
        return (celsius + 273.15) * 9/5
      default:
        return celsius
    }
  }

  // Perform conversion
  const convert = (value: string, from: string, to: string, cat: ConversionCategory): string => {
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return ''

    const categoryData = conversionData[cat]
    const fromUnitData = categoryData.units.find(u => u.name === from)
    const toUnitData = categoryData.units.find(u => u.name === to)

    if (!fromUnitData || !toUnitData) return ''

    let result: number

    if (cat === 'temperature') {
      result = convertTemperature(numValue, from, to)
    } else {
      // Convert to base unit then to target unit
      const baseValue = numValue * fromUnitData.factor
      result = baseValue / toUnitData.factor
    }

    // Format result with appropriate precision
    if (Math.abs(result) < 0.001 || Math.abs(result) > 1000000) {
      return result.toExponential(6)
    } else {
      return result.toPrecision(8).replace(/\.?0+$/, '')
    }
  }

  // Update conversion when inputs change
  useEffect(() => {
    const result = convert(fromValue, fromUnit, toUnit, category)
    setToValue(result)
  }, [fromValue, fromUnit, toUnit, category])

  const handleSwapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
  }

  const handleReset = () => {
    setFromValue('1')
    const categoryData = conversionData[category]
    setFromUnit(categoryData.units[0].name)
    setToUnit(categoryData.units[1].name)
  }

  const addToHistory = () => {
    if (fromValue && toValue) {
      const fromUnitData = conversionData[category].units.find(u => u.name === fromUnit)
      const toUnitData = conversionData[category].units.find(u => u.name === toUnit)
      const entry = `${fromValue} ${fromUnitData?.symbol} = ${toValue} ${toUnitData?.symbol}`
      setHistory(prev => [entry, ...prev].slice(0, 10))
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(toValue)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Unit Converter</h1>
        <p className="text-xl text-muted-foreground">
          Convert between different units of measurement for science, engineering, and mathematics
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Converter</CardTitle>
              <CardDescription>
                Select a category and units to convert between
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={category} onValueChange={(v) => {
                setCategory(v as ConversionCategory)
                const categoryData = conversionData[v]
                setFromUnit(categoryData.units[0].name)
                setToUnit(categoryData.units[1].name)
                setFromValue('1')
              }}>
                <TabsList className="grid grid-cols-5 gap-2 h-auto">
                  <TabsTrigger value="length">Length</TabsTrigger>
                  <TabsTrigger value="weight">Weight</TabsTrigger>
                  <TabsTrigger value="temperature">Temperature</TabsTrigger>
                  <TabsTrigger value="volume">Volume</TabsTrigger>
                  <TabsTrigger value="area">Area</TabsTrigger>
                  <TabsTrigger value="time">Time</TabsTrigger>
                  <TabsTrigger value="speed">Speed</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                  <TabsTrigger value="energy">Energy</TabsTrigger>
                  <TabsTrigger value="pressure">Pressure</TabsTrigger>
                </TabsList>

                <div className="mt-6 space-y-6">
                  {/* From Unit */}
                  <div className="space-y-2">
                    <Label>From</Label>
                    <div className="flex gap-2">
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {conversionData[category].units.map(unit => (
                            <SelectItem key={unit.name} value={unit.name}>
                              {unit.name} ({unit.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input 
                        type="text" 
                        value={fromValue}
                        onChange={(e) => setFromValue(e.target.value)}
                        className="flex-1"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSwapUnits}
                      className="rounded-full"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* To Unit */}
                  <div className="space-y-2">
                    <Label>To</Label>
                    <div className="flex gap-2">
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {conversionData[category].units.map(unit => (
                            <SelectItem key={unit.name} value={unit.name}>
                              {unit.name} ({unit.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex-1 relative">
                        <Input 
                          type="text" 
                          value={toValue}
                          readOnly
                          className="pr-10"
                          placeholder="Result"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-0 top-0 h-full"
                          onClick={copyToClipboard}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="flex-1"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <Button 
                      onClick={addToHistory}
                      className="flex-1"
                      disabled={!fromValue || !toValue}
                    >
                      Add to History
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Quick Reference */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Common Conversions in {conversionData[category].name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {conversionData[category].units.slice(0, 8).map(unit => (
                  <div key={unit.name} className="flex justify-between text-sm">
                    <span className="font-medium">{unit.name}:</span>
                    <span className="text-muted-foreground">{unit.symbol}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* History */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion History</CardTitle>
              <CardDescription>Recent conversions</CardDescription>
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
                  No conversions yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Use scientific notation for very large or small numbers (e.g., 1.5e10)</p>
              <p>• Click the swap button to quickly reverse the conversion</p>
              <p>• Copy results to clipboard with the copy button</p>
              <p>• Temperature conversions use precise formulas</p>
              <p>• Digital storage uses binary (1024) conversions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About the Unit Converter</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p>
              Our comprehensive unit converter supports conversions across 10 major categories 
              essential for academic, scientific, and engineering work. Whether you're working 
              on physics homework, engineering calculations, or research papers, this tool 
              provides accurate conversions with scientific precision.
            </p>
            
            <h3>Supported Categories:</h3>
            <ul>
              <li><strong>Length:</strong> From nanometers to light years</li>
              <li><strong>Weight/Mass:</strong> Metric and imperial units</li>
              <li><strong>Temperature:</strong> Celsius, Fahrenheit, Kelvin, and Rankine</li>
              <li><strong>Volume:</strong> Metric, US, and Imperial measurements</li>
              <li><strong>Area:</strong> Square units and land measurements</li>
              <li><strong>Time:</strong> From nanoseconds to years</li>
              <li><strong>Speed:</strong> Including scientific units like Mach and c</li>
              <li><strong>Digital Storage:</strong> Bits, bytes, and their multiples</li>
              <li><strong>Energy:</strong> Joules, calories, and more</li>
              <li><strong>Pressure:</strong> Pascal, atmospheres, PSI, and others</li>
            </ul>

            <h3>Features:</h3>
            <ul>
              <li>Real-time conversion as you type</li>
              <li>Support for scientific notation</li>
              <li>Conversion history tracking</li>
              <li>Quick unit swapping</li>
              <li>Copy results to clipboard</li>
              <li>High precision calculations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Physics: Convert between SI and imperial units for mechanics problems</li>
              <li>Chemistry: Convert between different volume and mass measurements</li>
              <li>Engineering: Work with pressure, energy, and dimensional units</li>
              <li>Computer Science: Convert between different data storage units</li>
              <li>Geography: Convert between different area and distance measurements</li>
              <li>Laboratory Work: Ensure accurate unit conversions for experiments</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
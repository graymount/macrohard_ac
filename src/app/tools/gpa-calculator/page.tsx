'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Trash2, 
  Calculator, 
  GraduationCap,
  TrendingUp,
  Target,
  BookOpen,
  Award
} from 'lucide-react'

type GradeScale = '4.0' | '5.0' | 'percentage' | 'letter'
type LetterGrade = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'F'

interface Course {
  id: string
  name: string
  grade: string
  credits: number
  isAP?: boolean // For 5.0 scale
}

interface Semester {
  id: string
  name: string
  courses: Course[]
  gpa: number
}

const gradePoints: { [key in LetterGrade]: { regular: number; weighted: number } } = {
  'A+': { regular: 4.0, weighted: 5.0 },
  'A': { regular: 4.0, weighted: 5.0 },
  'A-': { regular: 3.7, weighted: 4.7 },
  'B+': { regular: 3.3, weighted: 4.3 },
  'B': { regular: 3.0, weighted: 4.0 },
  'B-': { regular: 2.7, weighted: 3.7 },
  'C+': { regular: 2.3, weighted: 3.3 },
  'C': { regular: 2.0, weighted: 3.0 },
  'C-': { regular: 1.7, weighted: 2.7 },
  'D+': { regular: 1.3, weighted: 2.3 },
  'D': { regular: 1.0, weighted: 2.0 },
  'D-': { regular: 0.7, weighted: 1.7 },
  'F': { regular: 0.0, weighted: 0.0 }
}

const percentageToGPA = (percentage: number): number => {
  if (percentage >= 93) return 4.0
  if (percentage >= 90) return 3.7
  if (percentage >= 87) return 3.3
  if (percentage >= 83) return 3.0
  if (percentage >= 80) return 2.7
  if (percentage >= 77) return 2.3
  if (percentage >= 73) return 2.0
  if (percentage >= 70) return 1.7
  if (percentage >= 67) return 1.3
  if (percentage >= 65) return 1.0
  if (percentage >= 60) return 0.7
  return 0.0
}

export default function GPACalculatorPage() {
  const [scale, setScale] = useState<GradeScale>('4.0')
  const [currentSemester, setCurrentSemester] = useState<Course[]>([
    { id: '1', name: '', grade: '', credits: 3 }
  ])
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [targetGPA, setTargetGPA] = useState('')
  const [currentCredits, setCurrentCredits] = useState('')
  const [currentGPA, setCurrentGPA] = useState('')

  const addCourse = () => {
    setCurrentSemester([
      ...currentSemester,
      { id: Date.now().toString(), name: '', grade: '', credits: 3 }
    ])
  }

  const removeCourse = (id: string) => {
    setCurrentSemester(currentSemester.filter(course => course.id !== id))
  }

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCurrentSemester(
      currentSemester.map(course =>
        course.id === id ? { ...course, [field]: value } : course
      )
    )
  }

  const calculateGPA = (courses: Course[]): number => {
    const validCourses = courses.filter(c => c.grade && c.credits > 0)
    if (validCourses.length === 0) return 0

    let totalPoints = 0
    let totalCredits = 0

    validCourses.forEach(course => {
      let gradePoint = 0
      
      if (scale === 'letter') {
        const grade = course.grade as LetterGrade
        gradePoint = course.isAP 
          ? gradePoints[grade]?.weighted || 0
          : gradePoints[grade]?.regular || 0
      } else if (scale === 'percentage') {
        const percentage = parseFloat(course.grade)
        gradePoint = percentageToGPA(percentage)
      } else if (scale === '4.0' || scale === '5.0') {
        gradePoint = parseFloat(course.grade)
        if (course.isAP && scale === '5.0' && gradePoint > 0) {
          gradePoint = Math.min(5.0, gradePoint + 1.0)
        }
      }

      totalPoints += gradePoint * course.credits
      totalCredits += course.credits
    })

    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  const saveSemester = (name: string) => {
    const gpa = calculateGPA(currentSemester)
    const newSemester: Semester = {
      id: Date.now().toString(),
      name,
      courses: [...currentSemester],
      gpa
    }
    setSemesters([...semesters, newSemester])
    setCurrentSemester([{ id: Date.now().toString(), name: '', grade: '', credits: 3 }])
  }

  const calculateCumulativeGPA = (): number => {
    if (semesters.length === 0) return 0
    
    let totalPoints = 0
    let totalCredits = 0
    
    semesters.forEach(semester => {
      semester.courses.forEach(course => {
        if (course.grade && course.credits > 0) {
          let gradePoint = 0
          
          if (scale === 'letter') {
            const grade = course.grade as LetterGrade
            gradePoint = course.isAP 
              ? gradePoints[grade]?.weighted || 0
              : gradePoints[grade]?.regular || 0
          } else if (scale === 'percentage') {
            const percentage = parseFloat(course.grade)
            gradePoint = percentageToGPA(percentage)
          } else {
            gradePoint = parseFloat(course.grade)
            if (course.isAP && scale === '5.0' && gradePoint > 0) {
              gradePoint = Math.min(5.0, gradePoint + 1.0)
            }
          }
          
          totalPoints += gradePoint * course.credits
          totalCredits += course.credits
        }
      })
    })
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  const calculateRequiredGPA = (): string => {
    if (!targetGPA || !currentCredits || !currentGPA) return '-'
    
    const target = parseFloat(targetGPA)
    const credits = parseFloat(currentCredits)
    const current = parseFloat(currentGPA)
    const additionalCredits = 15 // Assume 15 credits for next semester
    
    const requiredGPA = (target * (credits + additionalCredits) - current * credits) / additionalCredits
    
    if (requiredGPA > (scale === '5.0' ? 5.0 : 4.0)) {
      return `Not achievable with ${additionalCredits} credits`
    }
    
    return requiredGPA.toFixed(2)
  }

  const getGPAColor = (gpa: number): string => {
    const maxGPA = scale === '5.0' ? 5.0 : 4.0
    const percentage = (gpa / maxGPA) * 100
    
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 80) return 'text-blue-600'
    if (percentage >= 70) return 'text-yellow-600'
    if (percentage >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const currentGPAValue = calculateGPA(currentSemester)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">GPA Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Calculate your Grade Point Average with support for different grading scales
        </p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">GPA Calculator</TabsTrigger>
          <TabsTrigger value="cumulative">Cumulative GPA</TabsTrigger>
          <TabsTrigger value="target">Target GPA</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your GPA</CardTitle>
              <CardDescription>Enter your courses and grades to calculate your GPA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="scale">Grading Scale</Label>
                <Select value={scale} onValueChange={(value: GradeScale) => setScale(value)}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Select grading scale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.0">4.0 Scale (Standard)</SelectItem>
                    <SelectItem value="5.0">5.0 Scale (Weighted)</SelectItem>
                    <SelectItem value="letter">Letter Grades</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
                  <div className="col-span-5">Course Name</div>
                  <div className="col-span-3">Grade</div>
                  <div className="col-span-2">Credits</div>
                  {scale === '5.0' && <div className="col-span-1">AP/H</div>}
                  <div className={scale === '5.0' ? 'col-span-1' : 'col-span-2'}></div>
                </div>

                {currentSemester.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-12 gap-2">
                    <div className="col-span-5">
                      <Input
                        placeholder="Course name"
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      {scale === 'letter' ? (
                        <Select
                          value={course.grade}
                          onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(gradePoints).map(grade => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={scale === 'percentage' ? 'number' : 'text'}
                          placeholder={scale === 'percentage' ? '0-100' : '0.0-' + (scale === '5.0' ? '5.0' : '4.0')}
                          value={course.grade}
                          onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                          min={0}
                          max={scale === 'percentage' ? 100 : (scale === '5.0' ? 5 : 4)}
                          step={scale === 'percentage' ? 1 : 0.1}
                        />
                      )}
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="Credits"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                        min={0}
                        max={10}
                        step={0.5}
                      />
                    </div>
                    {scale === '5.0' && (
                      <div className="col-span-1 flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={course.isAP || false}
                          onChange={(e) => updateCourse(course.id, 'isAP', e.target.checked)}
                          className="h-4 w-4"
                        />
                      </div>
                    )}
                    <div className={scale === '5.0' ? 'col-span-1' : 'col-span-2'}>
                      {currentSemester.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addCourse}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Course
                </Button>
              </div>

              <div className="mt-6 p-6 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current GPA</p>
                    <p className={`text-4xl font-bold ${getGPAColor(currentGPAValue)}`}>
                      {currentGPAValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      Total Credits: {currentSemester.reduce((sum, c) => sum + (c.credits || 0), 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Scale: {scale === '5.0' ? '5.0 (Weighted)' : scale === '4.0' ? '4.0 (Standard)' : scale}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Input
                  placeholder="Semester name (e.g., Fall 2024)"
                  id="semester-name"
                />
                <Button
                  onClick={() => {
                    const input = document.getElementById('semester-name') as HTMLInputElement
                    if (input?.value) {
                      saveSemester(input.value)
                      input.value = ''
                    }
                  }}
                >
                  Save Semester
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cumulative" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cumulative GPA</CardTitle>
              <CardDescription>Track your GPA across multiple semesters</CardDescription>
            </CardHeader>
            <CardContent>
              {semesters.length > 0 ? (
                <div className="space-y-4">
                  {semesters.map((semester) => (
                    <div key={semester.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">{semester.name}</h3>
                        <div className="flex items-center gap-4">
                          <span className={`font-bold ${getGPAColor(semester.gpa)}`}>
                            GPA: {semester.gpa.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSemesters(semesters.filter(s => s.id !== semester.id))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {semester.courses.map((course, index) => (
                          <div key={index} className="flex justify-between text-sm text-muted-foreground">
                            <span>{course.name || 'Course ' + (index + 1)}</span>
                            <span>
                              Grade: {course.grade}, Credits: {course.credits}
                              {course.isAP && ' (AP/Honors)'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 p-6 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                        <p className={`text-4xl font-bold ${getGPAColor(calculateCumulativeGPA())}`}>
                          {calculateCumulativeGPA().toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Total Semesters: {semesters.length}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Courses: {semesters.reduce((sum, s) => sum + s.courses.length, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No semesters saved yet</p>
                  <p className="text-sm mt-2">Use the GPA Calculator tab to add semesters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="target" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Target GPA Calculator</CardTitle>
              <CardDescription>Find out what GPA you need to reach your goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="current-gpa">Current GPA</Label>
                  <Input
                    id="current-gpa"
                    type="number"
                    placeholder="3.50"
                    value={currentGPA}
                    onChange={(e) => setCurrentGPA(e.target.value)}
                    min={0}
                    max={scale === '5.0' ? 5 : 4}
                    step={0.01}
                  />
                </div>
                <div>
                  <Label htmlFor="current-credits">Current Credits</Label>
                  <Input
                    id="current-credits"
                    type="number"
                    placeholder="60"
                    value={currentCredits}
                    onChange={(e) => setCurrentCredits(e.target.value)}
                    min={0}
                    step={1}
                  />
                </div>
                <div>
                  <Label htmlFor="target-gpa">Target GPA</Label>
                  <Input
                    id="target-gpa"
                    type="number"
                    placeholder="3.75"
                    value={targetGPA}
                    onChange={(e) => setTargetGPA(e.target.value)}
                    min={0}
                    max={scale === '5.0' ? 5 : 4}
                    step={0.01}
                  />
                </div>
              </div>

              <div className="mt-6 p-6 bg-muted rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Required GPA for Next Semester (15 credits)
                  </p>
                  <p className="text-4xl font-bold">
                    {calculateRequiredGPA()}
                  </p>
                  {calculateRequiredGPA() !== '-' && !calculateRequiredGPA().includes('Not') && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Maintain this GPA for 15 credits to reach your target
                    </p>
                  )}
                </div>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Tips for Improving Your GPA</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Attend all classes and participate actively</li>
                    <li>• Create a study schedule and stick to it</li>
                    <li>• Seek help from professors during office hours</li>
                    <li>• Form study groups with classmates</li>
                    <li>• Take advantage of tutoring services</li>
                    <li>• Choose courses strategically based on your strengths</li>
                    <li>• Retake courses with low grades if allowed</li>
                  </ul>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Information Section */}
      <div className="mt-12 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Understanding GPA Scales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">4.0 Scale (Standard)</h3>
              <p className="text-muted-foreground">
                The most common GPA scale in the United States. A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">5.0 Scale (Weighted)</h3>
              <p className="text-muted-foreground">
                Used for honors and AP courses. Adds 1.0 point to the standard scale for advanced courses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Letter Grades</h3>
              <p className="text-muted-foreground">
                Traditional A-F grading system with plus/minus variations. Each letter corresponds to a GPA value.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Percentage</h3>
              <p className="text-muted-foreground">
                Common in many countries. 90-100% = A, 80-89% = B, 70-79% = C, 60-69% = D, below 60% = F
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GPA Ranges and What They Mean</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Summa Cum Laude</span>
                <span className="text-muted-foreground">3.9 - 4.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Magna Cum Laude</span>
                <span className="text-muted-foreground">3.7 - 3.89</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cum Laude</span>
                <span className="text-muted-foreground">3.5 - 3.69</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dean's List</span>
                <span className="text-muted-foreground">3.5+ (varies by school)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Good Standing</span>
                <span className="text-muted-foreground">2.0+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
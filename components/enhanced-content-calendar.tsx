"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type ContentItem = {
  date: Date
  title: string
  platform: string
  media: string
  caption: string
  hashtags: string
  [key: string]: string | Date // Allow for additional fields
}

const platforms = ["Instagram", "TikTok", "LinkedIn"]
const mediaTypes = ["Video", "Image", "Carousel"]

export function EnhancedContentCalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [content, setContent] = useState<ContentItem[]>([])
  const [newContent, setNewContent] = useState<ContentItem>({
    date: new Date(),
    title: "",
    platform: "",
    media: "",
    caption: "",
    hashtags: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [additionalFields, setAdditionalFields] = useState<string[]>([])

  const handleInputChange = (key: string, value: string) => {
    setNewContent((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddContent = () => {
    if (date && newContent.title) {
      setContent([...content, { ...newContent, date }])
      setNewContent({
        date: new Date(),
        title: "",
        platform: "",
        media: "",
        caption: "",
        hashtags: "",
      })
      setIsDialogOpen(false)
    }
  }

  const handleAddField = () => {
    const fieldName = prompt("Enter the name of the new field:")
    if (fieldName && !additionalFields.includes(fieldName)) {
      setAdditionalFields([...additionalFields, fieldName])
      setNewContent((prev) => ({ ...prev, [fieldName]: "" }))
    }
  }

  const contentForSelectedDate = content.filter(
    (item) => item.date.toDateString() === date?.toDateString()
  )

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">Enhanced Content Calendar</h1>
      <div className="flex space-x-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="w-96 space-y-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Add Content</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Content</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newContent.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Platform
                  </Label>
                  <Select
                    onValueChange={(value) => handleInputChange("platform", value)}
                    value={newContent.platform}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="media" className="text-right">
                    Media
                  </Label>
                  <Select
                    onValueChange={(value) => handleInputChange("media", value)}
                    value={newContent.media}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mediaTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="caption" className="text-right">
                    Caption
                  </Label>
                  <Textarea
                    id="caption"
                    value={newContent.caption}
                    onChange={(e) => handleInputChange("caption", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hashtags" className="text-right">
                    Hashtags
                  </Label>
                  <Input
                    id="hashtags"
                    value={newContent.hashtags}
                    onChange={(e) => handleInputChange("hashtags", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                {additionalFields.map((field) => (
                  <div key={field} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={field} className="text-right">
                      {field}
                    </Label>
                    <Input
                      id={field}
                      value={newContent[field] instanceof Date ? newContent[field].toISOString() : newContent[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                ))}
                <Button onClick={handleAddField} variant="outline" className="mt-2">
                  Add Custom Field
                </Button>
                <Button onClick={handleAddContent}>Add Content</Button>
              </div>
            </DialogContent>
          </Dialog>
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <h2 className="font-semibold mb-2">
              Content for {date?.toDateString()}:
            </h2>
            {contentForSelectedDate.length > 0 ? (
              contentForSelectedDate.map((item, index) => (
                <div key={index} className="mb-4 p-2 border rounded">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">Platform: {item.platform}</p>
                  <p className="text-sm text-gray-600">Media: {item.media}</p>
                  <p className="text-sm text-gray-600">Caption: {item.caption}</p>
                  <p className="text-sm text-gray-600">Hashtags: {item.hashtags}</p>
                  {additionalFields.map((field) => (
                    <p key={field} className="text-sm text-gray-600">
                      {field}: {item[field] instanceof Date ? item[field].toDateString() : item[field]}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No content for this date.</p>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

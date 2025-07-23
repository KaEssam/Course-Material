# Course Management System

This document explains how to organize and order courses in your platform.

## Course Properties

Each course can have the following properties in its `_course.mdx` file:

- `title`: Display name for the course
- `description`: Brief course description  
- `visible`: Whether the course should be shown (default: true)
- `preview`: Whether this is a preview course (default: false)
- `order`: Numeric order for course display (optional)

## Course Ordering

Courses are displayed in the following order:
1. **Courses with `order`** - Sorted by order number (1, 2, 3, etc.)
2. **Courses without `order`** - Sorted alphabetically by title

### Example Course Configuration

#### Regular Course with Order:
```yaml
---
title: 'SQL Server Database Administration'
description: 'Complete guide to SQL Server administration and development'
visible: true
preview: false
order: 1
---
```

#### Preview Course with Order:
```yaml
---
title: 'C# Programming'
description: 'Learn C# programming fundamentals and .NET development'
visible: true
preview: true
order: 2
---
```

## Visual Organization

### Course Numbers
- Each course displays its order number in a circular badge
- Numbers appear prominently next to the course title
- If no `order` is specified, the system assigns numbers based on alphabetical position

### Course Sections
- **Courses** - Regular courses ready for learning
- **Preview Courses** - Courses in development with "Coming Soon" badge

### Preview Course Features
- "Preview" badge next to course title
- Slightly faded appearance 
- "Coming Soon" indicator in section header
- Still displays order numbers for organization

## Managing Course Order

To reorder courses:

1. **Add order numbers** to your `_course.mdx` files:
   ```yaml
   ---
   title: 'Your Course'
   order: 3
   ---
   ```

2. **Use sequential numbers** (1, 2, 3, 4, etc.) for best organization

3. **Leave gaps** if planning to insert courses later (e.g., use 10, 20, 30)

## Examples

### Three-Course Setup:
```
Course 1: order: 1 (SQL Fundamentals)
Course 2: order: 2 (Advanced SQL) 
Course 3: order: 3 (C# Programming - preview)
```

### Result Display:
```
📚 Courses
  [1] SQL Fundamentals
  [2] Advanced SQL

🔮 Preview Courses
  [3] C# Programming [Preview] [Coming Soon]
```

This system provides clear visual hierarchy and easy course management!

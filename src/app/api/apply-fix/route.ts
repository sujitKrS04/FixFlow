import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { fileName, content, action, backupEnabled = true } = await request.json();

    if (!fileName || !content) {
      return NextResponse.json(
        { error: 'fileName and content are required' },
        { status: 400 }
      );
    }

    // Security: Only allow files in the project directory
    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, fileName);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(projectRoot)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      );
    }

    // Create backup if enabled
    if (backupEnabled && action === 'write') {
      try {
        const existingContent = await fs.readFile(filePath, 'utf-8');
        const backupPath = `${filePath}.backup.${Date.now()}`;
        await fs.writeFile(backupPath, existingContent);
      } catch (error) {
        // File doesn't exist, no backup needed
      }
    }

    // Perform the requested action
    switch (action) {
      case 'write':
        await fs.writeFile(filePath, content, 'utf-8');
        return NextResponse.json({ 
          success: true, 
          message: `File ${fileName} has been updated successfully`,
          filePath 
        });

      case 'append':
        await fs.appendFile(filePath, content, 'utf-8');
        return NextResponse.json({ 
          success: true, 
          message: `Content appended to ${fileName}`,
          filePath 
        });

      case 'read':
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return NextResponse.json({ 
          success: true, 
          content: fileContent,
          filePath 
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "write", "append", or "read"' },
          { status: 400 }
        );
    }
  } catch (error: any) {
    console.error('File operation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to perform file operation', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');

    if (!fileName) {
      return NextResponse.json(
        { error: 'fileName parameter is required' },
        { status: 400 }
      );
    }

    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, fileName);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(projectRoot)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      );
    }

    const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({ 
      success: true, 
      content: fileContent,
      filePath 
    });
  } catch (error: any) {
    console.error('File read error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to read file', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

# Define the folders to be created
$folders = @(
    "src\configs",
    "src\controllers",
    "src\middlewares",
    "src\models",
    "src\routes",
    "src\services",
    "src\utils",
    "test"
)

# Define the files to be created within those folders
$files = @(
    "src\configs\db.config.js",
    "src\configs\app.config.js",
    "src\controllers\transactionController.js",
    "src\controllers\categoryController.js",
    "src\controllers\authController.js",
    "src\controllers\analysisController.js",
    "src\middlewares\authMiddleware.js",
    "src\middlewares\corsMiddleware.js",
    "src\middlewares\errorMiddleware.js",
    "src\models\transactionModel.js",
    "src\models\categoryModel.js",
    "src\models\userModel.js",
    "src\routes\transactionRoutes.js",
    "src\routes\authRoutes.js",
    "src\routes\categoryRoutes.js",
    "src\routes\analysisRoutes.js",
    "src\services\transactionService.js",
    "src\services\categoryService.js",
    "src\services\authService.js",
    "src\services\analysisService.js",
    "src\utils\llmIntegration.js",
    "src\utils\constants.js",
    "src\utils\helpers.js"
)

# Create the folders
foreach ($folder in $folders) {
    $path = Join-Path -Path (Get-Location) -ChildPath $folder
    New-Item -Path $path -ItemType Directory -Force | Out-Null
}

# Create the files
foreach ($file in $files) {
    $path = Join-Path -Path (Get-Location) -ChildPath $file
    New-Item -Path $path -ItemType File -Force | Out-Null
}

Write-Host "Folder structure and files have been created successfully."

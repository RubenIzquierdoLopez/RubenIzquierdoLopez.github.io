@echo off
setlocal

pushd "%~dp0_cv"
ruby build_cv.rb
if errorlevel 1 goto :error

lualatex -interaction=nonstopmode -halt-on-error main.tex
if errorlevel 1 goto :error
popd

copy /y "%~dp0_cv\main.pdf" "%~dp0Documents\Curriculum_Vitae.pdf" >nul
if errorlevel 1 goto :error

echo.
echo CV generated: _cv\main.pdf
echo Public CV updated: Documents\Curriculum_Vitae.pdf
echo Starting Jekyll at http://localhost:4000/
echo Press Ctrl+C to stop the local server.
echo.

"C:\Ruby40-x64\bin\ruby.exe" -e "class Object; def tainted?; false; end; end; require 'bundler'; Bundler.setup; spec=Gem.loaded_specs['jekyll']; load File.join(spec.full_gem_path, 'exe', 'jekyll')" serve --livereload
goto :end

:error
echo.
echo Failed to generate the CV. The local website was not started.
popd
exit /b 1

:end
endlocal
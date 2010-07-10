require 'rubygems'
require 'json'

NAME = 'jsblacklist'
task :default => :zip

def filelist 
	manifest = JSON.parse File.read('manifest.json')

	files = ['manifest.json']
	%w(background_page options_page).each do |key|
		files << manifest[key]
	end
	manifest['content_scripts'].each do |content_script|
		files += content_script['js']
	end
	files += manifest['icons'].values
end

task :zip do
	system 'zip', "#{NAME}.zip", *filelist
end

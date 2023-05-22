read -p "Make sure everything is saved - click enter to continue"
read -p 'Commit Message: ' commitmsg
echo "git add ."
git add .
echo "commit and push"
git commit -m "$commitmsg"
git push -u origin main
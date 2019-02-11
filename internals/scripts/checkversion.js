const exec = require('child_process').exec;
exec('npm -v', function(err, stdout, stderr) {
  if (err) throw err;
  const version = 5;
  if (parseFloat(stdout) < version) {
    throw new Error(
      `[ERROR: React Boilerplate] You need npm version @>=${version}`
    );
    process.exit(1);
  }
});
exec('node -v', function(err, stdout, stderr) {
  if (err) throw err;
  const version = 8;
  if (parseFloat(stdout) < version) {
    throw new Error(
      `[ERROR: React Boilerplate] You need node version @>=${version}`
    );
    process.exit(1);
  }
});

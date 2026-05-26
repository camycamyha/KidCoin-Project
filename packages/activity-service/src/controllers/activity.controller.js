const activityService = require('../services/activity.service')

async function listActivities(req, res, next) {
  try {
    const activities = await activityService.listActivities(req.user)
    res.json(activities)
  } catch (err) { next(err) }
}

async function getActivity(req, res, next) {
  try {
    const activity = await activityService.getActivity(req.params.id)
    res.json(activity)
  } catch (err) { next(err) }
}

async function createActivity(req, res, next) {
  try {
    const activity = await activityService.createActivity(req.body)
    res.status(201).json(activity)
  } catch (err) { next(err) }
}

async function publishActivity(req, res, next) {
  try {
    const activity = await activityService.publishActivity(req.params.id)
    res.json(activity)
  } catch (err) { next(err) }
}

async function submitActivity(req, res, next) {
  try {
    const result = await activityService.submitActivity(req.params.id, req.user.id, req.body.answers)
    res.json(result)
  } catch (err) { next(err) }
}

async function getStudentProgress(req, res, next) {
  try {
    const progress = await activityService.getStudentProgress(req.params.classroomId, req.params.studentId)
    res.json(progress)
  } catch (err) { next(err) }
}

module.exports = { listActivities, getActivity, createActivity, publishActivity, submitActivity, getStudentProgress }
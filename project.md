## About the project
Explain in a few lines what the project is and the inspiration.

## Contributors
If group project explain the team members

## My role
Explain in detail what your role was

## Glimpse of the project
Show a video of the project

## Step-by-Step process
Show a step by step list of how you achieved your role. You can also explain a little about what the other members achieved and how it was achieved.

## Resources
List down all the resources you used (Bibliography)

## Github and Demo Link
If you want to contribute to the project or want to have a look at the code, the GitHub link is attached belowwith:
- **GitHub Repository**: [View on GitHub](https://github.com/your-username/your-repo)
- **Live Demo**: [Visit Website](https://your-demo-url.com)
----------------------------------------------------------------------------------------------------------------------------
4-DOF pick and place robotic ARM

Python, Arduino

https://github.com/Krupal-Shah/visarm

https://www.youtube.com/watch?v=dQCW4TNUgEI&feature=youtu.be/

### VisARM:

## About the project

<p align="center">
  <img src="mdimg:3" alt="image" width="400">
</p>


This is a 4DOF robotic arm that can color sort objects automatically using visual feedback. It can autonomously localize objects and manipulate them. 

The objects are 3D printed colored squares that are placed in the workspace. A camera is mounted on top of the robot followed by correction for lens distortion to obtain a geometrically accurate  view of the scene. The workspace is a checkerboard with fixed geometry that is detected and used as a reference plane for mapping image-object locations into robot coordinates. Once the objects are detected, their positions are identified in the real world coordinates, and then inverse kinematics is applied to find the motor angles, moving to the robot to that position to grab the object. 

## Contributors
- Krupal Shah
- Jaspreet Singh Chhabra

## My role
I mainly worked on the inverse kinematics, object tracking, CAD models and the integration of all the different components to have a complete pick-and-place system. I also worked on debugging various bugs such as hardware errors, camera related problems and error due to drift in the system.

## Glimpse of the project
Show a video of the project

## Step-by-Step process
### Hardware
The parts of the robots were purchased from Amazon which was then assembled into a robot. Hardware mainly consisted of this metal robotic arm, Intel Realsense D435i camera, Arduino Uno and a PWM servo driver. We created a server-client connection where the server was the computer doing all of the computations and the client was the arduino getting the commands to move the robot. 

<p align="center">
<table>
  <tr>
    <td align="center">
      <img src="mdimg:4" alt="3D printed camera mount" width="100%"><br>
      <em>3D printed camera mount</em>
    </td>
    <td align="center">
      <img src="mdimg:5" alt="Arduino serial connection" width="90%"><br>
      <em>Serial connection on Arduino</em>
    </td>
    <td align="center">
      <img src="mdimg:6" alt="Visarm setup" width="140%"><br>
      <em>VisARM full setup</em>
    </td>
  </tr>
</table>
</p>

### Kinematics
We calculated the Denavit-Hartenberg (DH) parameters of our robot by assigning coordinate frames and calculating link lengths. 
<p align="center">
  <img src="mdimg:7" alt="image" width="300">
</p>

| Link (i) | θᵢ (rad)        | αᵢ₋₁ (rad) | dᵢ (mm)   | aᵢ₋₁ (mm) |
|----------|------------------|------------|-----------|------------|
| 1        | θ₁               | π/2        | 96        | 0          |
| 2        | θ₂               | 0          | 0         | 120        |
| 3        | −θ₃              | 0          | 0         | 96         |
| 4        | −θ₄ + π/2        | π/2        | 0         | 25         |
| 5        | θ₅               | 0          | 55 + 100  | 0          |

For the inverse kinematics, i.e., to map world coordinates to joint angles, we make use of trigonometry. We break down our robot into multiple subproblems and we try to find solutions to the subproblems. We are given the position for the end-effector to reach (x, y, z). Even though the robot is 5DOF, we only consider a 4DOF robot for simplicity, i.e., joint 5 is fixed. 

<p align="center">
  <img src="mdimg:8" alt="image" width="400">
</p>

$$
\theta_1 = \arctan\left(\frac{y}{x}\right)
$$

We shift the entire plane by $l_1$, in order to solve for the sub-problem $\theta_2, \theta_3, \theta_4$. We find that three angles from a planar arm and hence can be solved using the planar arm equations.

$$
L_{ee} = \sqrt{L_5^2 + (L_4^2 + L_6^2)}
$$

$$
r = x \cos\theta_1 + y \sin\theta_1
$$

$$
w_r = r - L_{ee} \cos\phi
$$

$$
w_z = z - L_{ee} \sin\phi
$$

$$
d = \sqrt{w_r^2 + w_z^2}
$$

$$
\theta_3 = \arccos\left( \frac{-(d^2 - L_2^2 - L_3^2)}{2 L_2 L_3} \right)
$$

Using the Law of Cosines:

$$
\alpha = \arctan\left(\frac{w_z}{w_r}\right)
$$

$$
\beta = \arccos\left( \frac{L_2^2 + d^2 - L_3^2}{2 L_2 d} \right)
$$

$$
\theta_2 =
\begin{cases}
(\alpha + \beta) - \frac{\pi}{2} \\
(\alpha - \beta) - \frac{\pi}{2}
\end{cases}
$$

Finally:

$$
\delta = \arctan\left(\frac{L_5}{L_4 + L_6}\right)
$$

$$
\theta_4 = \theta_2 + \theta_3 + \delta - \phi + \frac{\pi}{2}
$$
There are many combinations possible and not all candidates are valid solutions for our robot configuration. To determine which combinations of joint angles are actually valid, we plug the candiates back into the forward kinematics to see if the joint angles bring the end-effector to the desired position.

### Camera Calibration
Camera calibration was performed using MATLAB’s Camera Calibrator App with 10–15 checkerboard images from varied viewpoints. The app estimated camera intrinsics and extrinsics by minimizing the reprojection error.  

The Intel RealSense D435i showed modest radial distortion, which was corrected. The mean reprojection error was approximately 0.20 pixels.  

The calibrated intrinsic matrix and radial distortion coefficients are:

$$
K =
\begin{bmatrix}
898.3306 & 0 & 633.6178 \\[6pt]
0 & 898.7783 & 379.6450 \\[6pt]
0 & 0 & 1
\end{bmatrix},
\qquad
\mathbf{d}_{\text{radial}} =
\begin{bmatrix}
0.1402 \\[6pt]
-0.2897
\end{bmatrix}
$$

<p align="center">
<table>
  <tr>
    <td align="center">
      <img src="mdimg:9" alt="Estimated camera positions from the calibrator app" width="100%"><br>
      <em>Estimated camera positions from the calibrator app</em>
    </td>
    <td align="center">
      <img src="mdimg:10" alt="Reprojection errors in calibration" width="90%"><br>
      <em>Reprojection errors in calibration</em>
  </tr>
</table>
</p>

Using these results, we can map image pixel coordinates to world coordinates using the transformation  $T_{\text{checker}\rightarrow\text{camera}}$. After undistortion, the intrinsic matrix is inverted to obtain normalized camera rays, which are intersected with the checkerboard plane using the extrinsic calibration.  

Assuming a planar workspace ($Z = 0$), the mapping reduces to a 2D homography between the image and checkerboard planes, allowing pixel coordinates to be converted directly into metric workspace coordinates.  

The transformation from checkerboard to robot frame is:

$$
T_{\text{checker}\rightarrow\text{robot}} =
\begin{bmatrix}
0 & -1 & 0 & 305 \\[4pt]
-1 & 0 & 0 & 122 \\[4pt]
0 & 0 & -1 & 0 \\[4pt]
0 & 0 & 0 & 1
\end{bmatrix}
$$

with rotation and translation:

$$
R =
\begin{bmatrix}
0 & -1 & 0 \\[4pt]
-1 & 0 & 0 \\[4pt]
0 & 0 & -1
\end{bmatrix},
\qquad
T =
\begin{bmatrix}
305 \\[4pt]
122 \\[4pt]
0
\end{bmatrix}
$$

### Object detection

After calibration and pixel-to-robot mapping, colored objects are detected within the defined workspace. The robot first moves to a fixed survey position.

#### Workspace Initialization
The checkerboard workspace is defined using its four outer vertices and used to mask incoming frames.

#### Undistortion and Enhancement
Each frame is undistorted and contrast-enhanced:

$$
I_{\mathrm{undist}} = \operatorname{undistort}\!\left(I_{\mathrm{raw}},\, K,\, \mathbf{d}\right)
$$

$$
I_{\mathrm{eq}} = \operatorname{CLAHE}\!\left( \mathrm{HSV}_{V}\!\left( I_{\mathrm{undist}} \right) \right)
$$

#### Workspace Masking
The workspace region is isolated using a binary mask:

$$
I_{\mathrm{masked}} = I_{\mathrm{eq}} \odot \mathrm{Mask}_{\mathrm{board}}
$$

#### Color Segmentation
Objects are segmented in HSV space:

$$
M = \operatorname{inRange}\!\left( \mathrm{HSV}(I_{\mathrm{masked}}),\, \text{lower},\, \text{upper} \right)
$$

Noise is removed via filtering and morphology. Contours are extracted and filtered by area and shape, and centroids are computed as object locations.

#### Vertical Offset Correction
A correction is applied to account for detecting the blob center instead of the top surface:

$$
c_y^{\mathrm{corrected}} = c_y - \left( \text{max\_err} \cdot \frac{c_y - y_{\mathrm{top}}}{H} \right)
$$

#### Grasp Verification
After grasping, a region of interest is analyzed using HSV thresholding and contour checks. A pickup is considered successful if the detected region satisfies constraints on area, shape, and position.

### Merging it all

The robot first moves to a survey position where the full checkerboard is visible and its workspace bounds are determined. Objects are placed within this region and detected using the image processing pipeline.  

Detected pixel coordinates are projected into checkerboard coordinates using camera calibration, then transformed into robot coordinates. A positional correction is applied to improve accuracy.  

Inverse kinematics is used to move the arm to grasp the object. A fixed pickup height of **5 cm** is used (3 cm object height + 2 cm safety offset). After grasping, the robot returns to the survey position and verifies pickup success using the onboard camera. If unsuccessful, the grasp is retried; otherwise, the object is placed into the appropriate bin based on color.  

An angular offset is applied to $\theta_1$ to compensate for motor configuration:
- $-6^\circ$ when $y < 6.7$ cm  
- $0^\circ$ otherwise  

This completes the full pick-and-place sorting pipeline.

## Resources
List down all the resources you used (Bibliography)

## Github and Demo Link
If you want to contribute to the project or want to have a look at the code, the GitHub link is attached belowwith:
- **GitHub Repository**: [View on GitHub](https://github.com/your-username/your-repo)
- **Live Demo**: [Visit Website](https://your-demo-url.com)